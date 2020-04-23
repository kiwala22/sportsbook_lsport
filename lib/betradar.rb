module Betradar

   require 'openssl'
   require 'json'
   require 'uri'
   require 'net/http'
   require 'logger'

   @@logger ||= Logger.new("#{Rails.root}/log/betradar.log")
   @@logger.level = Logger::ERROR

   @@end_point = "https://api.betradar.com/v1/"
   @@auth_token = ENV['BETRADAR_TOKEN']

   def fetch_fixtures(date)
      url = @@end_point + "sports/en/schedules/#{date}/schedule.xml"
      uri = URI(url)
      puts uri
      http = Net::HTTP.new(uri.host, uri.port)
      http.read_timeout = 180
      request = Net::HTTP::Get.new(uri.request_uri)
      request['x-access-token'] = 'ANRL2tQf8N40oGQ4Ye'
      http.use_ssl = true
      #http.verify_mode = OpenSSL::SSL::VERIFY_PEER
      http.set_debug_output($stdout)
      response = http.request(request)
      #check the status of response and return a response or log an error
      if response.code == "200"
         events = Hash.from_xml(response)
         events["schedule"]["sport_event"].each do |event|
            Fixture.find_or_create_by(event_id: event["event"] ) do |fixture|
               fixture.scheduled_time = event["scheduled"]
               fixture.status = event["status"]
               fixture.live_odds = event["liveodds"]
               fixture.tournament_round = event["tournament_round"]["group_long_name"]
               fixture.betradar_id = event["tournament_round"]["betradar_id"]
               fixture.season_id = event["season"]["id"]
               fixture.season_name = event["season"]["name"]
               fixture.toutnament_id = event["tournament"]["id"]
               fixture.toutnament_name = event["tournament"]["name"]
               fixture.sport_id = event["sport"]["id"]
               fixture.sport_name = event["sport"]["name"]
               fixture.category_id = event["category"]["id"]
               fixture.category_name = event["category"]["name"]
               fixture.comp_one_id = event["competitors"]["competitor"][0]["id"]
               fixture.comp_one_name = event["competitors"]["competitor"][0]["name"]
               fixture.comp_one_abb = event["competitors"]["competitor"][0]["abbreviation"]
               fixture.comp_one_gender = event["competitors"]["competitor"][0]["gender"]
               fixture.comp_one_qualifier = event["competitors"]["competitor"][0]["qualifier"]
               fixture.comp_two_id = event["competitors"]["competitor"][1]["id"]
               fixture.comp_two_name = event["competitors"]["competitor"][1]["name"]
               fixture.comp_two_abb = event["competitors"]["competitor"][1]["abbreviation"]
               fixture.comp_two_gender = event["competitors"]["competitor"][1]["gender"]
               fixture.comp_two_qualifier = event["competitors"]["competitor"][1]["qualifier"]
            end
         end
         return response.code
      else
         @@logger.error(response.body)
         return response.body
      end

   rescue StandardError => e
      @@logger.error(e.message)
   end

   def fetch_fixture_changes
      url = @@end_point + "sports/en/fixtures/changes.xml"
      uri = URI(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.read_timeout = 180
      request = Net::HTTP::Get.new(uri.request_uri)
      request['x-access-token'] = 'ANRL2tQf8N40oGQ4Ye'
      http.use_ssl = true
      #http.verify_mode = OpenSSL::SSL::VERIFY_PEER
      http.set_debug_output($stdout)
      response = http.request(request)
      #check the status of response and return a response or log an error
      if response.code == "200"
         return response.body
      else
         @@logger.error(response.body)
         return response.body
      end

   rescue StandardError => e
      @@logger.error(e.message)
   end

   def update_betstop_reasons
      url = @@end_point + "descriptions/betstop_reasons.xml"
      uri = URI(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.read_timeout = 180
      request = Net::HTTP::Get.new(uri.request_uri)
      request['x-access-token'] = 'ANRL2tQf8N40oGQ4Ye'
      http.use_ssl = true
      #http.verify_mode = OpenSSL::SSL::VERIFY_PEER
      http.set_debug_output($stdout)
      response = http.request(request)
      #check the status of response and return a response or log an error
      if response.code == "200"
         #Update the db, read the xml
         reasons = Hash.from_xml(response.body)
         reasons['betstop_reasons_descriptions']['betstop_reason'].each do |reason|
            if BetstopReason.exists?(betstop_reason_id: reason['id'])
               #check if the description is the same as well
               betstop = BetstopReason.find_by(betstop_reason_id: reason['id'])
               if betstop.description != reason['description']
                  betstop.update_attributes(description: reason['description'])
               end
            else
               #creare the betstop reason
               BetstopReason.create(betstop_reason_id: reason['id'], description: reason['description'])
            end
         end
         return response.code
      else
         @@logger.error(response.body)
         return response.body
      end

   rescue StandardError => e
      @@logger.error(e.message)

   end

   def update_betting_status
      url = @@end_point + "descriptions/betting_status.xml"
      uri = URI(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.read_timeout = 180
      request = Net::HTTP::Get.new(uri.request_uri)
      request['x-access-token'] = 'ANRL2tQf8N40oGQ4Ye'
      http.use_ssl = true
      #http.verify_mode = OpenSSL::SSL::VERIFY_PEER
      http.set_debug_output($stdout)
      response = http.request(request)
      #check the status of response and return a response or log an error
      if response.code == "200"
         #Update the db, read the xml
         reasons = Hash.from_xml(response.body)
         reasons['betting_status_descriptions']['betting_status'].each do |status|
            if BettingStatus.exists?(betting_status_id: status['id'])
               #check if the description is the same as well
               betting_status = BettingStatus.find_by(betting_status_id: status['id'])
               if betting_status.description != status['description']
                  betting_status.update_attributes(description: status['description'])
               end
            else
               #creare the betstop reason
               BettingStatus.create(betting_status_id: status['id'], description: status['description'])
            end
         end
         return response.code
      else
         @@logger.error(response.body)
         return response.body
      end

   rescue StandardError => e
      @@logger.error(e.message)

   end

   def update_match_status
      url = @@end_point + "descriptions/en/match_status.xml"
      uri = URI(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.read_timeout = 180
      request = Net::HTTP::Get.new(uri.request_uri)
      request['x-access-token'] = 'ANRL2tQf8N40oGQ4Ye'
      http.use_ssl = true
      #http.verify_mode = OpenSSL::SSL::VERIFY_PEER
      http.set_debug_output($stdout)
      response = http.request(request)
      #check the status of response and return a response or log an error
      if response.code == "200"
         #Update the db, read the xml
         reasons = Hash.from_xml(response.body)
         reasons['match_status_descriptions']['match_status'].each do  |status|
            #extract the attached sports
            sports = status["sports"]["sport"].map{|f| f["id"].gsub("sr:sport:", "").to_i}
            if MatchStatus.exists?(match_status_id: status['id'])
               #check if the description is the same as well
               match_status = MatchStatus.find_by(match_status_id: status['id'])
               if match_status.description != status['description']
                  match_status.update_attributes(description: status['description'])
               end
            else
               #creare the betstop reason
               MatchStatus.create(match_status_id: status['id'], description: status['description'], sports: sports)
            end
         end
         return response.code
      else
         @@logger.error(response.body)
         return response.body
      end

   rescue StandardError => e
      @@logger.error(e.message)

   end

   def update_void_reasons
      url = @@end_point + "descriptions/void_reasons.xml"
      uri = URI(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.read_timeout = 180
      request = Net::HTTP::Get.new(uri.request_uri)
      request['x-access-token'] = 'ANRL2tQf8N40oGQ4Ye'
      http.use_ssl = true
      #http.verify_mode = OpenSSL::SSL::VERIFY_PEER
      http.set_debug_output($stdout)
      response = http.request(request)
      #check the status of response and return a response or log an error
      if response.code == "200"
         #Update the db, read the xml
         reasons = Hash.from_xml(response.body)
         reasons['void_reasons_descriptions']['void_reason'].each do |reason|
            if VoidReason.exists?(void_reason_id: reason['id'])
               #check if the description is the same as well
               void_reason = VoidReason.find_by(void_reason_id: reason['id'])
               if void_reason.description != reason['description']
                  void_reason.update_attributes(description: reason['description'])
               end
            else
               #creare the betstop reason
               VoidReason.create(void_reason_id: reason['id'], description: reason['description'])
            end
         end
         return response.code
      else
         @@logger.error(response.body)
         return response.body
      end

   rescue StandardError => e
      @@logger.error(e.message)

   end

end
