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
      
      markets.each do |market|
         model_name = "Market" + producer_type[product]
         entries = model_name.constantize.where(status: "Active")
         if entries
            entries.update(status: "Deactivated")
         end
      end
   end
   
end