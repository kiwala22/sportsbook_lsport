class UpdateFixtureWorker
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

   @@end_point = "https://api.betradar.com/v1/"
   @@auth_token = ENV['BETRADAR_TOKEN']

   def perform(event_id, update_time)
      url = @@end_point + "en/sport_events/#{event_id}/fixture.xml"
      uri = URI(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.read_timeout = 180
      request = Net::HTTP::Get.new(uri.request_uri)
      request['x-access-token'] = 'ANRL2tQf8N40oGQ4Ye'
      http.use_ssl = true
      #http.verify_mode = OpenSSL::SSL::VERIFY_PEER
      #http.set_debug_output($stdout)
      response = http.request(request)
      if response.code == "200"
         event = Hash.from_xml(response.body)
         Fixture.update_attributes(
            scheduled_time: event["scheduled"]
            status: event["status"]
            live_odds: event["liveodds"]
            tournament_round: event["tournament_round"]["group_long_name"]
            betradar_id: event["tournament_round"]["betradar_id"]
            season_id: event["season"]["id"] if event.has_key?("season")
            season_name: event["season"]["name"] if event.has_key?("season")
            tournament_id: event["tournament"]["id"]
            tournament_name: event["tournament"]["name"]
            sport_id: event["tournament"]["sport"]["id"]
            sport: event["tournament"]["sport"]["name"]
            category_id: event["tournament"]["category"]["id"]
            category: event["tournament"]["category"]["name"]
            comp_one_id: event["competitors"]["competitor"][0]["id"]
            comp_one_name: event["competitors"]["competitor"][0]["name"]
            comp_one_abb: event["competitors"]["competitor"][0]["abbreviation"]
            comp_one_gender: event["competitors"]["competitor"][0]["gender"]
            comp_one_qualifier: event["competitors"]["competitor"][0]["qualifier"]
            comp_two_id: event["competitors"]["competitor"][1]["id"]
            comp_two_name: event["competitors"]["competitor"][1]["name"]
            comp_two_abb: event["competitors"]["competitor"][1]["abbreviation"]
            comp_two_gender: event["competitors"]["competitor"][1]["gender"]
            comp_two_qualifier: event["competitors"]["competitor"][1]["qualifier"]
         )
         return response.code
      else
         @@logger.error(response.body)
         return response.body
      end
   end
end
