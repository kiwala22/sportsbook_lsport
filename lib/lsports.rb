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


    # Package IDs
    @@prematch_package_id = ""
    @@livematch_package_id = ""

    # Sports
    @@sports_id = 6046

    # Distribution endpoint
    @@distribution_endpoint = "https://stm-api.lsports.eu/Distribution/"

    # Starting/Enabling distribution
    def start_distribution(package_id)
        url = @@distribution_endpoint + "Start"
        uri = URI(url)

        req = Net::HTTP::Get.new(uri)

        ## Set request body
        request_body = {
            "PackageId": package_id,
            "Username": @@username,
            "Password": @@password
        }

        req.body = request_body.to_json

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        return res.code

    end

    # Stop/Disabling Distribution
    def stop_distribution(package_id)
        url = @@distribution_endpoint + "Stop"
        uri = URI(url)

        req = Net::HTTP::Get.new(uri)

        ## Set request body
        request_body = {
            "PackageId": package_id,
            "Username": @@username,
            "Password": @@password
        }

        req.body = request_body.to_json

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        return res.code

    end

    ## Fetch Markets
    def fetch_markets(package_id)
        url = "https://stm-api.lsports.eu/Markets/Get"

        uri = URI(url)

        req = Net::HTTP.Get.new(uri)

        ## Set request body
        request_body = {
            "PackageId": package_id,
            "Username": @@username,
            "Password": @@password,
            "SportsId": [@@sports_id],
            "IsSettleable": 1,
            "MarketType": 1
        }

        req.body = request_body.to_json

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        response = res.code

        if response == "200"
            ## Create new markets and outcomes here
            markets = res.body
            markets[:Markets].each do |market|
                Market.create(market_id: market[:Id].to_i, description: market[:Name])
                if market.has_key?(:Bets) && market[:Bets].has_key?(:Bet)
                    if market[:Bets][:Bet].is_a?(Array)
                        market[:Bets][:Bet].each do |outcome|
                            Outcome.create(outcome_id: outcome[:BaseLine].to_i, description: outcome[:Name])
                        end
                    else
                        Outcome.create(outcome_id: market[:Bets][:Bet][:BaseLine].to_i, description: market[:Bets][:Bet][:Name])
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
    def fetch_prematch_fixtures(from_date, to_date)
        start_date = from_date.to_time.to_i
        end_date = to_date.to_time.to_i
        url = "https://stm-snapshot.lsports.eu/PreMatch/GetFixtures"

        uri = URI(url)

        req = Net::HTTP.Get.new(uri)

        ## Set request body
        request_body = {
            "PackageId": @@prematch_package_id,
            "Username": @@username,
            "Password": @@password,
            "Sports": [@@sports_id],
            "FromDate": start_date,
            "ToDate": end_date
        }

        req.body = request_body.to_json

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        response = res.code

        if response == "200"
            events = res.body
            events[:Events][:Event].each do |fixture|
                CreateFixtureWorker.perform_async(event)
            end
            return response
        else
            @@logger.error(res.body)
            return res.body
        end
    end

    # Fetch single Fixture
    def fetch_prematch_fixture(fixture_id)
        url = "https://stm-snapshot.lsports.eu/PreMatch/GetFixtures"

        uri = URI(url)

        req = Net::HTTP.Get.new(uri)

        ## Set request body
        request_body = {
            "PackageId": @@prematch_package_id,
            "Username": @@username,
            "Password": @@password,
            "Sports": [@@sports_id],
            "Fixtures": [fixture_id]
        }

        req.body = request_body.to_json

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        response = res.code

        if response == "200"
            return res.body
        else
            @@logger.error(res.body)
            return res.body
        end
    end


    def book_live_event(fixture_id)
        url = "https://stm-api.lsports.eu/Fixtures/Subscribe"

        uri = URI(url)

        req = Net::HTTP.Get.new(uri)

        ## Set request body
        request_body = {
            "PackageId": @@livematch_package_id,
            "Username": @@username,
            "Password": @@password,
            "Sports": [@@sports_id],
            "Fixtures": [fixture_id]
        }

        req.body = request_body.to_json

        res = Net::HTTP.start(uri.hostname, uri.port,:use_ssl => uri.scheme == 'https') do |http|

            http.request(req)

        end

        event = res.body

        if res.code == "200" && event[:Fixtures].first[:Success] == true
            return 200
        else
            return 400
        end
    end

end

