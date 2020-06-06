module Recovery
    require 'openssl'
    require 'json'
    require 'uri'
    require 'net/http'
    require 'net/https'
    require 'yaml'

    def request_recovery(product_id,timestamp)
        producers = {}
        producers["1"] = "liveodds"
        producers["3"] = "pre"

        #start the post request
        producer_name = producers[product_id]
        puts producer_name
        url = ENV['RECOVERY_URL'] + "#{producer_name}/recovery/initiate_request"
        uri = URI(url)
        http = Net::HTTP.new(uri.host, uri.port)
        http.read_timeout = 180
        request = Net::HTTP::Post.new(uri.request_uri)
        request.set_form_data('after' => "#{timestamp}")
        request['x-access-token'] = ENV['BETRADAR_TOKEN']
        http.use_ssl = true
        #http.verify_mode = OpenSSL::SSL::VERIFY_PEER
        http.set_debug_output($stdout)
        response = http.request(request)
        
        return response
    end
end
      