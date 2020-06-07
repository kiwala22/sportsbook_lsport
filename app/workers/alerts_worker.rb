require 'sidekiq'
class AlertsWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical"
    sidekiq_options retry: false

    include Recovery

    def perform(payload)
   
        #set recovery status
        recovery_status = false
        #convert the message from the xml to an easr ruby Hash using active support
        message_hash = Hash.from_xml(payload)
        product = message_hash["alive"]["product"]
        timestamp  = message_hash["alive"]["timestamp"]
        subscribed  = message_hash["alive"]["subscribed"]

        #check the market alert
        last_update = MarketAlert.where(:product => product).order("timestamp DESC").first
        if last_update == nil
            #then create it
            last_update = MarketAlert.create(product: product, timestamp:  timestamp, subscribed:  subscribed, status:  recovery_status)
        else
            if subscribed == "0"
                #issue recovery API call
                recovery = request_recovery(product, last_update[:timestamp])  
                if recovery == "200"
                    recovery_status = true
                end
                #log all responses
            elsif subscribed == "1" && (timestamp.to_i - last_update[:timestamp].to_i) > 150000
                #issue recovery API
                recovery = request_recovery(product, last_update[:timestamp]) 
                if recovery == "200"
                    recovery_status = true
                end
                #log all responses
            end
            
            #save the damn alert anyway
            puts "saving ..."
            new_alert = MarketAlert.create(product: product, timestamp: timestamp, subscribed: subscribed, status: recovery_status)
         end
    end
    
end

