class MarketAlert < ApplicationRecord
   
   include Recovery
   include Betradar
   
   def check_producers
      (0..5).each do 
         ["1", "3"].each do |product|
            last_update = MarketAlert.where(:product => product, subscribed: "1").order("timestamp DESC").first
            if last_update
               if ((Time.now.to_i * 1000) - last_update[:timestamp].to_i) > 15000
                  #first close all active markets 
                  DeactivateMarketsWorker.perform_async(product)   
               end
            end
         end
         
         #check if connection is down
         last_alert = MarketAlert.last
         if last_alert && (((Time.now.to_i * 1000) - last_alert[:timestamp].to_i) > 15000)
            #if the last update irrespective if product is more than 60 seconds ago, then manual restart
            system('systemctl restart sneakers')
            
         end

         #check if mts connections are down
         amqp_connections = `netstat -oW | grep amqps | grep ESTABLISHED  | wc -l 2>&1`;  result=$?.success?
         if result == true
            if amqp_connections.to_i < 3
               system('systemctl restart betradar-betradar.1.service')
            end
         end
         
         sleep 12
      end
   end
   
   def deactivate_markets
      #disconnect all live markets
      #disconnect all pre markets
      products = ["1", "3"]
      threads = []
      products.each do |product|
         threads << Thread.new do
            DeactivateMarketsWorker.perform_async(product)   
         end
      end
      threads.each { |thr| thr.join }
   end
   
end
