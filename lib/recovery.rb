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

    def pull_latest_odds(product)
      if product == "1"
         response = get_live()
      end

      if product == "3"

         response = pull_odds_update()
      end

    end

    def restart_feed(product)
      if product == "1"
          code , message = start_livematch_distribution
          if code == 200 && message.include?("Value was already set")
             system('systemctl restart sneakers && systemctl restart lsport-inplay-lsport_inplay.1.service')
          end
      end

      if product == "3"
          code , message = start_prematch_distribution
          if code == 200 && message.include?("Value was already set")
             system('systemctl restart sneakers && systemctl restart lsport-prematch-lsport_prematch.1.service')
          end
      end
    end

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
                response = pull_odds_update()

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


    def pull_odds_update()

      sportsIds = ["6046", "48242", "54094"]

      #Fetching fixtures for all the 3 sport types
      sportsIds.each do |sport|
         fixture_today = fetch_fixture_markets(sport)
      end

    end
end
