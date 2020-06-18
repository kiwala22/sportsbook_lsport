require 'sidekiq'

class Soccer::RollbackSettlementWorker
    include Sidekiq::Worker
    sidekiq_options queue: "default"
    sidekiq_options retry: false
    
    def perform(payload)
        #convert the message from the xml to an easr ruby Hash using active support
        message = Hash.from_xml(payload)
        event_id = message["rollback_ bet_settlement"]["event_id"]
        product =  message["rollback_ bet_settlement"]["product"]
        
        #iterate over the outcomes and mark the markets as settled
        if message["rollback_bet_settlement"].has_key?("market") && message["rollback_bet_settlement"]["market"].is_a?(Array)
            message["rollback_bet_settlement"]["market"].each do |market|
                producer_type = {
                    "1" => "Live",
                    "3" => "Pre"
                }

                model_name = "Market" + market["id"] + producer_type[product]
                mkt_entry = model_name.constantize.find_by(event_id: event_id, status: "Settled")
                if mkt_entry
                    mkt_entry.update_attributes(status: "Deactivated", outcome: nil) 
                end

                #rollback the settlement on the bets
                      
            end
        end
        
        if message["rollback_bet_settlement"].has_key?("market") && message["rollback_bet_settlement"]["market"].is_a?(Hash)
            producer_type = {
                "1" => "Live",
                "3" => "Pre"
            }

            model_name = "Market" + message["rollback_bet_settlement"]["market"]["id"] + producer_type[product] 
                mkt_entry = model_name.constantize.find_by(event_id: event_id)

                if mkt_entry
                    mkt_entry.update_attributes(status: "Deactivated", outcome: nil)
                end

                #rollback the settlement on the bets

        end
        
        
    end
    
end