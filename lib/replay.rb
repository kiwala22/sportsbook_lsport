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
   
   def load_fixtures
      CSV.foreach("#{Rails.root}/public/soccer.csv", headers: true) do |row|
         th = Thread.new do
            #create the fixtures
            event_id = "sr:match:#{row[0]}"
            response = fetch_fixture(event_id)

            event = Hash.from_xml(response)
            fixture = Fixture.where(event_id: event_id)
            if fixture
               update_attr = {scheduled_time: event["fixtures_fixture"]["fixture"]["scheduled"],
                  status: event["fixtures_fixture"]["fixture"]["status"],
                  live_odds: event["fixtures_fixture"]["fixture"]["liveodds"],
                  tournament_round: event["fixtures_fixture"]["fixture"]["tournament_round"]["group_long_name"],
                  betradar_id: event["fixtures_fixture"]["fixture"]["tournament_round"]["betradar_id"],
                  tournament_id: event["fixtures_fixture"]["fixture"]["tournament"]["id"],
                  tournament_name: event["fixtures_fixture"]["fixture"]["tournament"]["name"],
                  sport_id: event["fixtures_fixture"]["fixture"]["tournament"]["sport"]["id"],
                  sport: event["fixtures_fixture"]["fixture"]["tournament"]["sport"]["name"],
                  category_id: event["fixtures_fixture"]["fixture"]["tournament"]["category"]["id"],
                  category: event["fixtures_fixture"]["fixture"]["tournament"]["category"]["name"],
                  comp_one_id: event["fixtures_fixture"]["fixture"]["competitors"]["competitor"][0]["id"],
                  comp_one_name: event["fixtures_fixture"]["fixture"]["competitors"]["competitor"][0]["name"],
                  comp_one_abb: event["fixtures_fixture"]["fixture"]["competitors"]["competitor"][0]["abbreviation"],
                  comp_one_gender: event["fixtures_fixture"]["fixture"]["competitors"]["competitor"][0]["gender"],
                  comp_one_qualifier: event["fixtures_fixture"]["fixture"]["competitors"]["competitor"][0]["qualifier"],
                  comp_two_id: event["fixtures_fixture"]["fixture"]["competitors"]["competitor"][1]["id"],
                  comp_two_name: event["fixtures_fixture"]["fixture"]["competitors"]["competitor"][1]["name"],
                  comp_two_abb: event["fixtures_fixture"]["fixture"]["competitors"]["competitor"][1]["abbreviation"],
                  comp_two_gender: event["fixtures_fixture"]["fixture"]["competitors"]["competitor"][1]["gender"],
                  comp_two_qualifier: event["fixtures_fixture"]["fixture"]["competitors"]["competitor"][1]["qualifier"]
               }
               if event["fixtures_fixture"]["fixture"].has_key?("season")
                  update_attr[:season_id] = event["fixtures_fixture"]["fixture"]["season"]["id"] 
                  update_attr[:season_name] = event["fixtures_fixture"]["fixture"]["season"]["name"]
               end   
               fixture.update(update_attr)
            else
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

   def fetch_fixture(event_id)
      url = @@end_point + "replay/sports/en/sport_events/#{event_id}/fixture.xml"
      uri = URI(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.read_timeout = 180
      request = Net::HTTP::Get.new(uri.request_uri)
      request['x-access-token'] = @@auth_token
      http.use_ssl = true
      #http.verify_mode = OpenSSL::SSL::VERIFY_PEER
      #http.set_debug_output($stdout)
      response = http.request(request)
      #check the status of response and return a response or log an error
      if response.code == "200"
         return response.body
      else
         @@logger.error(response.body)
         return 400
      end
   end
   
   
   
   
end