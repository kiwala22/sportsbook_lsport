require 'sidekiq'
class DeactivateMarketsWorker
   include Sidekiq::Worker
   sidekiq_options queue: "critical"
   sidekiq_options retry: false
   
   def perform(product)
      threads = []
      producer_type = {
         "1" => "Live",
         "3" => "Pre"
      }
      markets = ["1","60", "10", "63", "18","68", "29", "75", "16", "66"]
      #check all markets in parallel  
      markets.each do |market|
         threads << Thread.new do
            model_name = "Market" + market + producer_type[product]
            #deactivate all active markets
            model_name.constantize.where(status: "Active").update_all(status: "Deactivated")
         end
      end
      threads.each { |thr| thr.join }
   end
   
end