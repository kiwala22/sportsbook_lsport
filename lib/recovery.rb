module Recovery
    require 'openssl'
    require 'json'
    require 'uri'
    require 'net/http'
    require 'net/https'
    require 'yaml'

    # Credentials for distributors
    @@username = "jamal.sultan@gmail.com" #"acaciabengo@skylinesms.com"
    @@password = "G388@d39sE" #"tyb54634"
    @@prematch_guid = "73421406-5d00-4cee-b6fe-3abbf2469db1" #"20bc3235-eb98-422c-9c32-beacc9c9303a"

    # # Sports
    @@sports_id = "6046"

    # # Package IDs
    @@prematch_pkg_id = "4372" #"3537"
    @@livematch_pkg_id = "4373" #"3538"

    # # Endpoints
    @@end_point = "https://prematch.lsports.eu/OddService/"
    @@live_end_point = "https://inplay.lsports.eu/api/"
    
    include Lsports

    def request_recovery(product,timestamp)

        #try and activate the markets again
        if product == "1"
            code , message = start_livematch_distribution
            if code == 200 && message.include?("Value was already set")
                system('systemctl restart sneakers && systemctl restart lsport-inplay-lsport_inplay.1.service')
                sleep 3
                response = get_live()

            end
        end

        if product == "3"
            code , message = start_prematch_distribution
            if code == 200 && message.include?("Value was already set")
                system('systemctl restart sneakers && systemctl restart lsport-prematch-lsport_prematch.1.service')
                sleep 3
                response = fetch_fixtures()

            end
        end 
            
    end

    def get_live(sports_id = @sports_id)
        url = @@live_end_point + "Snapshot/GetSnapshotJson"

        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            packageid: @@livematch_pkg_id,
            sportids: sports_id
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        response = res.code

        if response == "200"
            return JSON.parse(res.body)
        else
            @@logger.error(res.body)
            return JSON.parse(res.body)
        end
    end

    def fetch_fixtures(sports_id = @@sports_id)
        required_markets = ["1", "2", "3", "7", "17", "25", "28", "41", "42", "43", "44", "49", "52", "53", "63", "77", "113", "282"]
        markets = required_markets.join(",")

        url = @@end_point + "GetFixtureMarkets"

        uri = URI(url)
        params= {
            username: @@username,
            password: @@password,
            guid: @@prematch_guid,
            sports: sports_id
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        response = res.code

        if response == "200"
            ## Create Fixture markets
            markets = JSON.parse(res.body).as_json
            
            markets["Body"].each do |market|
                if market.has_key?("FixtureId")
                    event_id = market["FixtureId"]
                    fixture = Fixture.find_by(event_id: event_id)
                    market_status = {
                        1 => "Active",
                        2 => "Suspended",
                        3 => "Settled"
                    }
                    
                    attrs = {}
                    outcomes = {}

                    if fixture
                        if market.has_key?("Markets") && market["Markets"].is_a?(Array)
                            market["Markets"].each do |event|
                                # mkt = "Market" + (event["Id"]).to_s + "Pre"
                                mkt = "PreMarket"
                                if event.has_key?("Providers") && event["Providers"].is_a?(Array)
                                    event["Providers"].each do |provider|
                                        if provider.has_key?("Bets") && provider["Bets"].is_a?(Array)
                                            if provider["Bets"].any? { |el| el.has_key?("BaseLine") }
                                                bets = provider["Bets"].group_by{ |vl| vl["BaseLine"]}
                                                bets.each do |key, value|
                                                    attrs["specifier"] = key
                                                    value.each do |bet|
                                                        outcomes.store("outcome_#{bet["Name"]}", bet["Price"])
                                                        attrs["status"] = market_status[bet["Status"]]
                                                    end

                                                    ## Find the specified market in the DB
                                                    mkt_entry = mkt.constantize.find_by(fixture_id: fixture.id, market_identifier: event["Id"], specifier: key, status: "Deactivated")

                                                    if mkt_entry
                                                        prevOdds = mkt_entry.odds
                                                        attrs["odds"] = prevOdds.merge!(outcomes)
                                                        mkt_entry.assign_attributes(attrs)
                                                        mkt_entry.save
                                                    end

                                                    outcomes = {}
                                                    attrs = {}
                                                end
                                            else
                                                provider["Bets"].each do |bet|
                                                    outcomes.store("outcome_#{bet["Name"]}", bet["Price"])
                                                    attrs["status"] = market_status[bet["Status"]]
                                                end

                                                ## Find the specified market in the DB
                                                mkt_entry = mkt.constantize.find_by(fixture_id: fixture.id, market_identifier: event["Id"], status: "Deactivated")

                                                if mkt_entry
                                                    prevOdds = mkt_entry.odds
                                                    attrs["odds"] = prevOdds.merge!(outcomes)
                                                    mkt_entry.assign_attributes(attrs)
                                                    mkt_entry.save
                                                end
                                                
                                                outcomes = {}
                                                attrs = {}
                                            end
                                        end
                                    end
                                end
                            end
                        end
                    end
                end
            end

            return response
        else
            @@logger.error(res.body)
            return JSON.parse(res.body)
        end
    end

    # def start_prematch

    #     url = @@end_point + "EnablePackage"
    #     uri = URI(url)
    #     params = {
    #         username: @@username,
    #         password: @@password,
    #         guid: @@prematch_guid
    #     }

    #     uri.query = URI.encode_www_form(params)

    #     req = Net::HTTP::Get.new(uri)

    #     res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

    #         http.request(req)

    #     end

    #     # process the body
    #     message = JSON.parse(res.body)

    #     message = message["Body"][0]["Response"]

    #     return res.code, message

    # end

    # def start_livematch
    #     url = @@live_end_point + "Package/EnablePackage"
    #     uri = URI(url)
    #     params = {
    #         username: @@username,
    #         password: @@password,
    #         packageid: @@livematch_pkg_id
    #     }
    #     uri.query = URI.encode_www_form(params)

    #     req = Net::HTTP::Get.new(uri)

    #     res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

    #         http.request(req)

    #     end

    #     # process the body
    #     message = JSON.parse(res.body)
    #     message = message["Body"]["Message"]

    #     return res.code, message

    # end
end
