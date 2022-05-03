require 'sidekiq'
class AlertsWorker
   include Sidekiq::Worker
   sidekiq_options queue: "critical"
   sidekiq_options retry: false

   include Recovery

   def perform(message, routing_key)

      if routing_key == "pre_match"
         product = "3"
         threshold = 90
      end

      if routing_key == "in_play"
         product = "1"
         threshold = 20
      end

      #extract the timestamp
      timestamp = message["Header"]["ServerTimestamp"]

      #set recovery status
      recovery_status = false

      #check the market alert
      last_update = MarketAlert.where(:product => product).last
      #If there is no update before then create the first one and mark the product as subscribed
      if last_update == nil
         #then create it
         first_alert = MarketAlert.create(
            {
               product: product,
               timestamp:  timestamp,
               status:  recovery_status,
               subscribed: "1"
            }
         )

      elsif (Time.now.to_i - timestamp.to_i)  <= threshold
         #if the update is within normal time range then check if the previous one was normal too or not
         #if previous one was normal then just create an update that is subscribed
         if last_update.subscribed == "1" || last_update.subscribed == nil
            alert = MarketAlert.create(
               {
                  product: product,
                  timestamp: timestamp,
                  status: recovery_status,
                  subscribed: "1"
               }
            )

         else
            #if the last update was unsubscribed then request for recovery
            RecoveryWorker.perform_async(product)

            #then save the current on time alert
            alert = MarketAlert.create(
               {
                  product: product,
                  timestamp: timestamp,
                  status: recovery_status,
                  subscribed: "1"
               }
            )

         end

      elsif (Time.now.to_i - timestamp.to_i) > threshold
         #If the new alert is later than the threshold, unsubscribe the products
         # by setting subscribed to 0

         puts "Deactivation :: WORKERS ::::: timestamp: #{timestamp}, new stamp: #{last_update[:timestamp]}, product: #{product}"
         #first close all active markets
         DeactivateMarketsWorker.perform_async(product)
         alert = MarketAlert.create(
            {
               product: product,
               timestamp: timestamp,
               status: recovery_status,
               subscribed: "0"
            }
         )
      end
   end

end
