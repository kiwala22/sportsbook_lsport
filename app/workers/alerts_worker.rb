require 'sidekiq'
class AlertsWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical"
    sidekiq_options retry: false

    include Recovery

    def perform(message, routing_key)

        if routing_key == "pre_match"
            product = "3"
            threshold = 60
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
        if last_update == nil
            #then create it 
            last_update = MarketAlert.create(product: product, timestamp:  timestamp, status:  recovery_status)
        else
            
            if (timestamp.to_i - last_update[:timestamp].to_i) > threshold
                logger.debug("timestamp: {timestamp}", "new stamp: {last_update[:timestamp]}, diff: {timestamp.to_i - last_update[:timestamp].to_i}, product: {product}")
                #first close all active markets 
                DeactivateMarketsWorker.perform_async(product)

               #then request recovery
                request_recovery(product,Time.now.to_i)

            end

            #save the damn alert anyway
            puts "saving ..."
            new_alert = MarketAlert.create(product: product, timestamp: timestamp, status: recovery_status)
         end
    end

end
