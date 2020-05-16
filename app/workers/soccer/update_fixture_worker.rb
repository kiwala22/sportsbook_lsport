class Soccer::UpdateFixtureWorker
   include Sidekiq::Worker
   sidekiq_options queue: "high"
   sidekiq_options retry: false

   require 'openssl'
   require 'json'
   require 'uri'
   require 'net/http'
   require 'logger'

   @@logger ||= Logger.new("#{Rails.root}/log/betradar.log")
   @@logger.level = Logger::ERROR

   @@end_point = "https://stgapi.betradar.com/v1/"
   @@auth_token = ENV['BETRADAR_TOKEN']

   def perform(event_id, update_time)
      url = @@end_point + "en/sport_events/#{event_id}/fixture.xml"
      uri = URI(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.read_timeout = 180
      request = Net::HTTP::Get.new(uri.request_uri)
      request['x-access-token'] = @@auth_token
      http.use_ssl = true
      #http.verify_mode = OpenSSL::SSL::VERIFY_PEER
      #http.set_debug_output($stdout)
      response = http.request(request)
      if response.code == "200"
         event = Hash.from_xml(response.body)
         fixture = SoccerFixture.where(event_id: event_id)
         if fixture && (fixture.updated_at < update_time)
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
               update_attr[season_id:] event["fixtures_fixture"]["fixture"]["season"]["id"] 
               update_attr[season_name:] event["fixtures_fixture"]["fixture"]["season"]["name"]
            end   
            fixture.update_attributes(update_attr)
            return response.code
         else
            @@logger.error(response.body)
            return response.body
         end
      end
   end
end
