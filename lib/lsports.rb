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
    def get_events(from_date, to_date)

        start_date = from_date.to_time.to_i
        end_date = to_date.to_time.to_i

        url = @@end_point + "GetEvents"

        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            guid: @@prematch_guid,
            sports: @@sports_id,
            fromdate: start_date,
            todate: end_date
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        if response == "200"
            return res.body
        else
            @@logger.error(res.body)
            return res.body
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
            markets = res.body
            markets["Body"].each do |market|
                Market.create(market_id: market["Id"].to_i, description: market["Name"])
            end

            return response
        else
            @@logger.error(res.body)
            return res.body
        end
    end

    def fetch_fixture_markets
        available_markets = ["1", "2", "3", "7", "17", "25", "53", "77", "113", "282"]
        markets = available_markets.join(",")

        url = @@end_point + "GetFixtureMarkets"

        uri = URI(url)
        params= {
            username: @@username,
            password: @@password,
            guid: @@prematch_guid,
            sports: @@sports_id,
            markets: markets
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        response = res.code

        if response == "200"
            ## Create market outcomes
            markets = res.body
            markets["Body"].each do |market|
                if market.has_key?("Markets")
                    if market["Markets"].is_a?(Array)
                        market["Markets"].each do |outcome|
                            #Outcome.create(outcome_id: outcome[:BaseLine].to_i, description: outcome[:Name])
                        end
                    else
                        #Outcome.create(outcome_id: market[:Bets][:Bet][:BaseLine].to_i, description: market[:Bets][:Bet][:Name])
                    end
                end
            end

            return response
        else
            @@logger.error(res.body)
            return res.body
        end
    end

    # Fetch Fixtures
    def fetch_fixtures(from_date, to_date)

        start_date = from_date.to_time.to_i
        end_date = to_date.to_time.to_i

        url = @@end_point + "GetFixtures"
        params = {
            username: @@username,
            password: @@password,
            guid: @@prematch_guid,
            fromdate: start_date,
            todate: end_date,
            sports: @@sports_id
        }
        uri.query = URI.encode_www_form(params)

        uri = URI(url)

        req = Net::HTTP.Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        response = res.code

        if response == "200"
            events = res.body
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
    def fetch_fixture(fixture_id)
        url = @@end_point + "GetFixtures"

        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            guid: @@prematch_guid,
            sports: @@sports_id,
            fixtures: fixture_id
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        if response == "200"
            return res.body
        else
            @@logger.error(res.body)
            return res.body
        end
    end

    def order_live_event(fixture_id)
        url = @@live_end_point + "schedule/OrderFixtures"

        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            packageid: @@livematch_pkg_id,
            sportids: @@sports_id,
            fixtureids: fixture_id
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        if response == "200"
            return 200
        else
            @@logger.error(res.body)
            return 400
        end
    end

    def cancel_live_event_order(fixture_id)
        url = @@live_end_point + "schedule/CancelFixtureOrders"

        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            packageid: @@livematch_pkg_id,
            sportids: @@sports_id,
            fixtureids: fixture_id
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        if response == "200"
            return 200
        else
            @@logger.error(res.body)
            return 400
        end
    end

    def get_live_events
        url = @@live_end_point + "Snapshot/GetSnapshotJson"

        uri = URI(url)
        params = {
            username: @@username,
            password: @@password,
            packageid: @@livematch_pkg_id,
            sportids: @@sports_id
        }
        uri.query = URI.encode_www_form(params)

        req = Net::HTTP::Get.new(uri)

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        if response == "200"
            return res.body
        else
            @@logger.error(res.body)
            return res.body
        end
    end

end

