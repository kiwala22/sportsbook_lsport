require 'sidekiq'
class DeactivateMarketsWorker
   include Sidekiq::Worker
   sidekiq_options queue: "critical"
   sidekiq_options retry: false
   
   def perform(product)
      producer_type = {
         "1" => "Live",
         "3" => "Pre"
      }
      markets = ["1","60", "10", "63", "18","68", "29", "75", "16", "66"]
      
      markets.each do |market|
         model_name = "Market" + market + producer_type[product]
         entries = model_name.constantize.where(status: "Active")
         puts entries.count
         if entries
            entries.update(status: "Deactivated")
         end
      end
   end
   
end