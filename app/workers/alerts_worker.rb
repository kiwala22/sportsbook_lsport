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
         #create an update subscribed
         alert = MarketAlert.create(
            {
               product: product,
               timestamp: timestamp,
               status: recovery_status,
               subscribed: "1"
            }
         )

      elsif (Time.now.to_i - timestamp.to_i) > threshold
         #If the new alert is later than the threshold, unsubscribe the products
         # by setting subscribed to 0

         puts "Deactivation :: WORKERS ::::: timestamp: #{timestamp}, new stamp: #{last_update[:timestamp]}, product: #{product}"
         #first close all active markets
         DeactivateMarketsWorker.perform_async(product)
         RecoveryWorker.perform_async(product, last_update.timestamp)
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
