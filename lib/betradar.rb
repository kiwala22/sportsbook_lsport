module Betradar

   require 'openssl'
   require 'json'
   require 'uri'
   require 'net/http'
   require 'logger'

   @@end_point = "api.betradar.com/v1/sports/en/"
   @@auth_token = ENV['BETRADAR_TOKEN']

   def fetch_fixtures(date)
      iso_date = ""
      url = @@end_point + "schedules/#{iso_date}/schedule.xml"

   end

   def fetch_fixture_changes()

   end

   def update_betstop_reasons

   end

   def update_betting_status

   end

   def update_match_status

   end

   def update_void_reasons

   end

end
