class MarketAlert < ApplicationRecord

   include Recovery

   # Credentials for distributors
   @@username = "jamal.sultan@gmail.com" #"acaciabengo@skylinesms.com"
   @@password = "G388@d39sE" #"tyb54634"
   @@prematch_guid = "73421406-5d00-4cee-b6fe-3abbf2469db1" #"20bc3235-eb98-422c-9c32-beacc9c9303a"

   # Sports
   @@sports_id = "6046"

   # Package IDs
   @@prematch_pkg_id = "4372" #"3537"
   @@livematch_pkg_id = "4373" #"3538"

   # Endpoints
   @@end_point = "https://prematch.lsports.eu/OddService/"
   @@live_end_point = "https://inplay.lsports.eu/api/"


   def check_producers
      (0..5).each do
         ["1", "3"].each do |product|
            if product == "3"
               threshold = 90
            end

            if product == "1"
               threshold = 20
            end
            last_update = MarketAlert.where(:product => product).last
            if last_update
               if ((Time.now.to_i ) - last_update[:timestamp].to_i) > threshold
                  #first close all active markets
                  puts "Deactivation :: CHECK ::::: timestamp: #{timestamp}, new stamp: #{last_update[:timestamp]}, product: #{product}"
                  DeactivateMarketsWorker.perform_async(product)

                  #Restart the Feed
                  restart_feed()

               end
            end
         end
      end

      sleep 12
   end



end
