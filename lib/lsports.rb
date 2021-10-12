module Lsports

    require 'openssl'
    require 'json'
    require 'uri'
    require 'net/http'
    require 'logger'

    @@logger ||= Logger.new("#{Rails.root}/log/lsports.log")
    @@logger.level = Logger::ERROR


    # Credentials for distributors
    @@username = "acaciabengo@skylinesms.com"
    @@password = "tyb54634"
    @@prematch_guid = "20bc3235-eb98-422c-9c32-beacc9c9303a"

    # Sports
    @@sports_id = "6046"

    # Package IDs
    @@prematch_pkg_id = "3537"
    @@livematch_pkg_id = "3538"

    # Endpoints
    @@end_point = "https://prematch.lsports.eu/OddService/"
    @@live_end_point = "https://inplay.lsports.eu/api/"

    # Starting/Enabling distribution
    def start_prematch_distribution

        url = @@end_point + "EnablePackage"
        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            guid: @@prematch_guid
        }
        
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        puts res.body

        return res.code

    end

    def start_livematch_distribution
        url = @@live_end_point + "Package/EnablePackage"
        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            packageid: @@livematch_pkg_id
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        return res.code

    end

    # Stop/Disabling Distribution
    def stop_prematch_distribution
        url = @@end_point + "DisablePackage"
        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            guid: @@prematch_guid
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)


        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        return res.code

    end

    def stop_livematch_distribution
        url = @@live_end_point + "Package/DisablePackage"
        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            packageid: @@livematch_pkg_id
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        return res.code

    end

    ## Get Events
    ## Dates can be in format "Date.today.strftime("%F")"
    ## Method call ex: get_events(Date.today.strftime("%F"), (Date.today + 1.day).strftime("%F"))
    def get_events(from_date, to_date, sports_id)

        # Convert the date to Unix timestamps
        start_date = from_date.to_time.to_i
        end_date = to_date.to_time.to_i

        # Markets we require 
        required_markets = ["1", "2", "3", "7", "17", "25", "53", "77", "113", "282"]
        markets = required_markets.join(",") 

        url = @@end_point + "GetEvents"

        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            guid: @@prematch_guid,
            sports: sports_id,
            fromdate: start_date,
            todate: end_date,
            markets: markets
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        response = res.code
        result = JSON.parse(res.body)

        if response == "200"
            return result["Body"]
        else
            @@logger.error(result)
            return JSON.parse(result)
        end
    end

    ## Fetch Markets
    def fetch_markets
        url = @@end_point + "GetMarkets"

        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            guid: @@prematch_guid
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        response = res.code

        if response == "200"
            ## Create new markets
            markets = JSON.parse(res.body)
            markets["Body"].each do |market|
                Market.create(market_id: market["Id"].to_i, description: market["Name"])
                # Outcome.create(outcome_id: market["Providers"]["Bets"]["Name"], description: "#{market["Name"]} - #{market["Providers"]["Bets"]["Name"]}")

            end

            return response
        else
            @@logger.error(res.body)
            return JSON.parse(res.body)
        end
    end

    def fetch_fixture_markets(sports_id)
        required_markets = ["1", "2", "3", "7", "17", "25", "28", "41", "42", "43", "44", "49", "52", "53", "63", "77", "113", "282"]
        markets = required_markets.join(",")

        url = @@end_point + "GetFixtureMarkets"

        uri = URI(url)
        params= {
            username: @@username,
            password: @@password,
            guid: @@prematch_guid,
            sports: sports_id,
            markets: markets
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
                    @@market_description = market["Name"]
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
                                            provider["Bets"].each do |bet|
                                                if [2, 28, 77].include?(event["Id"])
                                                    if bet["BaseLine"] == "2.5"
                                                        outcomes.store("outcome_#{bet["Name"]}", bet["Price"])
                                                        attrs["status"] = market_status[bet["Status"]]
                                                    end
                                                elsif [3, 52, 53, 63].include?(event["Id"])
                                                    if bet["BaseLine"] == "-1.0 (0-0)"
                                                        outcomes.store("outcome_#{bet["Name"]}", bet["Price"])
                                                        attrs["status"] = market_status[bet["Status"]]
                                                    end
                                                else
                                                    outcomes.store("outcome_#{bet["Name"]}", bet["Price"])
                                                    attrs["status"] = market_status[bet["Status"]]
                                                end
                                            end
                                            attrs["odds"] = outcomes
                                        end
                                    end
                                end
                                mkt_entry = mkt.constantize.new(attrs)
                                mkt_entry.market_identifier = event["Id"]
                                mkt_entry.fixture_id = fixture.id
                                mkt_entry.save
                                outcomes = {}
                                attrs = {}
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

    # Fetch Fixtures
    ## Use unix timestamps format for parameters
    ## Method call ex: fetch_fixtures(1623479275, 1623565675)
    def fetch_fixtures(from_date, to_date, sports_id)

        url = @@end_point + "GetFixtures"
        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            guid: @@prematch_guid,
            fromdate: from_date,
            todate: to_date,
            sports: sports_id
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        response = res.code

        if response == "200"
            events = JSON.parse(res.body)
            events["Body"].each do |fixture|
                CreateFixtureWorker.perform_async(fixture)
            end
            return response
        else
            @@logger.error(res.body)
            return res.body
        end
    end

    # Fetch single Fixture
    def fetch_fixture(fixture_id, sports_id)
        url = @@end_point + "GetFixtures"

        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            guid: @@prematch_guid,
            sports: sports_id,
            fixtures: fixture_id
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

    def fetch_live_events_schedule(sports_id)
        url = @@live_end_point + "schedule/GetInPlaySchedule"

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

        result = JSON.parse(res.body)

        if response == "200"
            return result["Body"]
        else
            @@logger.error(result)
            return result
        end
    end

    def order_live_event(fixture_id, sports_id)
        url = @@live_end_point + "schedule/OrderFixtures"

        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            packageid: @@livematch_pkg_id,
            sportids: sports_id,
            fixtureids: fixture_id
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        response = res.code
        result = JSON.parse(res.body)

        if response == "200" && result["Body"].has_key?("Ordered")
            return 200
        else
            @@logger.error(res.body)
            return 400
        end
    end

    def cancel_live_event_order(fixture_id, sports_id)
        url = @@live_end_point + "schedule/CancelFixtureOrders"

        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            packageid: @@livematch_pkg_id,
            sportids: sports_id,
            fixtureids: fixture_id
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        response = res.code
        result = JSON.parse(res.body)

        if response == "200" && result["Body"].has_key?("Cancelled")
            return 200
        else
            @@logger.error(res.body)
            return 400
        end
    end

    def get_live_events(sports_id)
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

end

