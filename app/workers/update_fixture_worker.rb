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

      fixture_status = {
            1 => "not_started",
            2 => "live",
            3 => "finished",
            4 => "cancelled",
            5 => "postponed",
            6 => "interrupted",
            7 => "Abandoned",
            8 => "coverage lost",
            9 => "about to start"
        }

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
         fixture = Fixture.where(event_id: event_id)
         if fixture && (fixture.updated_at < update_time)
            update_attr = {start_date: event["Fixture"]["StartDate"],
               status: fixture_status[event["Fixture"]["Status"]],
               ext_provider_id: event["Fixture"]["ExternalProviderId"],
               league_id: event["Fixture"]["League"]["Id"],
               league_name: event["Fixture"]["League"]["Name"],
               sport_id: event["Fixture"]["Sport"]["Id"],
               sport: event["Fixture"]["Sport"]["Name"],
               location_id: event["Fixture"]["Location"]["Id"],
               location: event["Fixture"]["Location"]["Name"],
               part_one_id: event["Fixture"]["Participants"][0]["Id"],
               part_one_name: event["Fixture"]["Participants"][0]["Name"],
               
               part_two_id: event["Fixture"]["Participants"][1]["Id"],
               part_two_name: event["Fixture"]["Participants"][1]["Name"]

               #we need to add the home and away score too
            }
               
            # if event["fixtures_fixture"]["fixture"].has_key?("season")
            #    update_attr[:season_id] = event["fixtures_fixture"]["fixture"]["season"]["id"] 
            #    update_attr[:season_name] = event["fixtures_fixture"]["fixture"]["season"]["name"]
            # end   
            fixture.update(update_attr)
            return response.code
         else
            @@logger.error(response.body)
            return response.body
         end
      end
   end
end
