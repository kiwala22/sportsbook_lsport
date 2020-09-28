class MarketAlert < ApplicationRecord
   
   include Recovery
   include Betradar
   
   def check_producers
      ["1", "3"].each do |product|
         last_update = MarketAlert.where(:product => product, subscribed: "1").order("timestamp DESC").first
         if last_update
            if ((Time.now.to_i * 1000) - last_update[:timestamp].to_i) > 20000
               #first close all active markets 
               DeactivateMarketsWorker.perform_async(product)   
               ##attempt manual reconnection
               puts %x{systemctl restart betradar}
            end
         end
      end

      #check if connection is down
      last_alert = MarketAlert.last
      if last_alert && (((Time.now.to_i * 1000) - last_alert[:timestamp].to_i) > 60000)
         #if the last update irrespective if product is more than 60 seconds ago, then manual restart
         system('systemctl restart betradar')
      end
   end
   
end
