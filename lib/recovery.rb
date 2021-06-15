module Recovery
    require 'openssl'
    require 'json'
    require 'uri'
    require 'net/http'
    require 'net/https'
    require 'yaml'

    include Lsports

    def request_recovery(product_id,timestamp)
        case product_id

        when "3"
            response = start_prematch_distribution    
            return response
        when "1"
            response = start_livematch_distribution    
            return response
        end
            
    end
end
