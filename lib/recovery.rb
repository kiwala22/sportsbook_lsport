module Recovery
    require 'openssl'
    require 'json'
    require 'uri'
    require 'net/http'
    require 'net/https'
    require 'yaml'

    # # Credentials for distributors
    # @@username = "acaciabengo@skylinesms.com"
    # @@password = "tyb54634"
    # @@prematch_guid = "20bc3235-eb98-422c-9c32-beacc9c9303a"

    # # Sports
    # @@sports_id = "6046"

    # # Package IDs
    # @@prematch_pkg_id = "3537"
    # @@livematch_pkg_id = "3538"

    # # Endpoints
    # @@end_point = "https://prematch.lsports.eu/OddService/"
    # @@live_end_point = "https://inplay.lsports.eu/api/"
    
    include Lsports

    def request_recovery(product,timestamp)

        #try and activate the markets again
        if product == "1"
            code , message = start_livematch
            if code == 200 && message == "Value was already set" 
                system('systemctl restart sneakers && systemctl restart lsport-inplay-lsport_inplay.1.service')
                sleep 3
                response = get_live_events()

            end
        end

        if product == "3"
            code , message = start_prematch
            if code == 200 && message == "Value was already set" 
                system('systemctl restart sneakers && systemctl restart lsport-prematch-lsport_prematch.1.service')
                sleep 3
                response = fetch_fixture_markets()

            end
        end 
            
    end


    def start_prematch

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

        # process the body
        message = JSON.parse(res.body)
        message = message["Body"]["Message"]

        return res.code, message

    end

    def start_livematch
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

        # process the body
        message = JSON.parse(res.body)
        message = message["Body"]["Message"]

        return res.code, message

    end
end
