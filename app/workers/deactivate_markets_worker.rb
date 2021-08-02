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
      markets = [
         "1", "2", "3", "7", "17", "25",
         "28", "41", "42", "43", "44", "49", 
         "52", "53", "63", "77", "113", "282"
      ]
      
      markets.each do |market|
         model_name = "Market" + market + producer_type[product]
         entries = model_name.constantize.where(status: "Active")
         if entries
            entries.update(status: "Deactivated")
         end
      end
   end
   
end