require 'sidekiq'
class AlertsWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical"
    sidekiq_options retry: false

    include Recovery
    include Betradar

    def perform(message)

        #set recovery status
        recovery_status = false
        #convert the message from the xml to an easr ruby Hash using active support
        product = message["alive"]["product"]
        timestamp  = message["alive"]["timestamp"]
        subscribed  = message["alive"]["subscribed"]

        #check the market alert
        last_update = MarketAlert.where(:product => product, subscribed: "1").order("timestamp DESC").first
        if last_update == nil
            #then create it
            last_update = MarketAlert.create(product: product, timestamp:  timestamp, subscribed:  subscribed, status:  recovery_status)
        else
            if subscribed == "0"
                #first close all active markets 
                DeactivateMarketsWorker.perform_async(product)
                #issue recovery API call
                recovery = request_recovery(product, last_update[:timestamp])  
                if recovery == "202"
                    recovery_status = true
                end
                #call fixture changes
                changed_fixtures = fetch_fixture_changes()
            elsif subscribed == "1" && (timestamp.to_i - last_update[:timestamp].to_i) > 20000
                #first close all active markets 
                DeactivateMarketsWorker.perform_async(product)
                #issue recovery API
                recovery = request_recovery(product, last_update[:timestamp]) 
                if recovery == "202"
                    recovery_status = true
                end
                #call fixture changes
                changed_fixtures = fetch_fixture_changes()
            end

            #save the damn alert anyway
            puts "saving ..."
            new_alert = MarketAlert.create(product: product, timestamp: timestamp, subscribed: subscribed, status: recovery_status)
         end
    end

end
