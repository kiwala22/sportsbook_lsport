require 'sidekiq'
class AlertsWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical"
    sidekiq_options retry: false

    include Recovery
    include Betradar

    def perform(message, routing_key)

        message = JSON.parse(message)

        if routing_key = "pre_match"
            product = "3"
        end

        if routing_key = "in_play"
            product = "1"
        end

        #extract the timestamp
        timestamp = message["Header"]["ServerTimestamp"]

        #set recovery status
        recovery_status = false

        #check the market alert
        last_update = MarketAlert.where(:product => product).order("timestamp DESC").first
        if last_update == nil
            #then create it
            last_update = MarketAlert.create(product: product, timestamp:  timestamp, status:  recovery_status)
        else
            
            if (timestamp.to_i - last_update[:timestamp].to_i) > 20000
                #first close all active markets 
                DeactivateMarketsWorker.perform_async(product)
            end

            #save the damn alert anyway
            puts "saving ..."
            new_alert = MarketAlert.create(product: product, timestamp: timestamp, status: recovery_status)
         end
    end

end
