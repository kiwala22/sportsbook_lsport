module Replay
   require 'openssl'
   require 'json'
   require 'uri'
   require 'net/http'
   require 'logger'

   @@logger ||= Logger.new("#{Rails.root}/log/betradar.log")
   @@logger.level = Logger::ERROR

   @@end_point = "https://stgapi.betradar.com/v1/"
   @@auth_token = 's5X0wAgEmHCxDqrPnI'
   include Betradar
   def load_fixtures
      CSV.foreach("#{Rails.root}/public/soccer.csv", headers: true) do |row|
         th = Thread.new do
            #create the fixtures
            response = fetch_fixture("sr:match:#{row[0]}")

            event = Hash.from_xml(response)
            puts event
            
            case event["fixtures_fixture"]["fixture"]["tournament"]["sport"]["id"]
            when "sr:sport:1"
               Soccer::CreateFixtureWorker.perform_async(event["fixtures_fixture"]["fixture"])
            end
         end
         th.join

         
      end
   end

   def add_to_replay
      CSV.foreach("#{Rails.root}/public/soccer.csv", headers: true) do |row|
         th = Thread.new do
            #add to replay
            add_event("sr:match:#{row[0]}")
         end
         th.join
      end
   end

   def add_event(event_id)
      url = @@end_point + "replay/events/#{event_id}"
      uri = URI(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.read_timeout = 180
      request = Net::HTTP::Put.new(uri.request_uri)
      request['x-access-token'] = @@auth_token
      http.use_ssl = true
      http.ssl_version = 'TLSv1'
      #http.verify_mode = OpenSSL::SSL::VERIFY_PEER
      http.set_debug_output($stdout)
      response = http.request(request)
      event = Hash.from_xml(response.body)
      
      if response.code == "200"
         return 200
      else
         @@logger.error(response.body)
         return 400
      end
   end
   
   
   
end