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
      
      model_name = producer_type[product] + "Market" 
      model_name.constantize.where(status: "Active").update_all(status: "Deactivated"
   end
   
end