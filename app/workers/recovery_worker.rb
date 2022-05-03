require 'sidekiq'
class RecoveryWorker
   include Sidekiq::Worker
   sidekiq_options queue: "high"
   sidekiq_options retry: false

   include Lsports

   def perform(product, timestamp)
      if product == "3"
         #get a Snapshot
         last_alert = MarketAlert
         sportsIds = ["6046", "48242", "54094"]

         #Fetching fixtures for all the 3 sport types
         sportsIds.each do |sport|
            fixture_today = recover_fixture_markets(sport, timestamp.to_i  ,Time.now())
         end

         #Re-activate all markets
         producer_type = {
            "1" => "Live",
            "3" => "Pre"
         }

         model_name = producer_type[product] + "Market"
         model_name.constantize.where(status: "Deactivated").update_all(status: "Active")

      end

      if product == "1"
         response = get_live()
      end

   end
end
