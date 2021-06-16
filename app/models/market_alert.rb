class MarketAlert < ApplicationRecord

   include Recovery
   include Lsports
   
   def check_producers
      (0..5).each do 
         ["1", "3"].each do |product|
            last_update = MarketAlert.where(:product => product).order("timestamp DESC").first
            if last_update
               if ((Time.now.to_i ) - last_update[:timestamp].to_i) > 20
                  #first close all active markets 
                  DeactivateMarketsWorker.perform_async(product)  

                  #then request recovery
                  #try and activate the markets again
                  #issue recovery API call
                  recovery = request_recovery(product, last_update[:timestamp])  
                  if recovery == "200"
                     recovery_status = true
                  end 
               end
            end
         end

         #check if connection is down
         last_alert = MarketAlert.last
         if last_alert && (((Time.now.to_i ) - last_alert[:timestamp].to_i) > 60)
            #if the last update irrespective if product is more than 60 seconds ago, then manual restart
            system('systemctl restart sneakers && systemctl restart lsport-inplay-lsport_inplay.1.service && systemctl restart lsport-prematch-lsport_prematch.1.service')
            
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
