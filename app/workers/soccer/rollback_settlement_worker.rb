require 'sidekiq'

class Soccer::RollbackSettlementWorker
    include Sidekiq::Worker
    sidekiq_options queue: "default"
    sidekiq_options retry: false
    
    def perform(payload)
        #convert the message from the xml to an easr ruby Hash using active support
        message = Hash.from_xml(payload)
        event_id = message["rollback_bet_settlement"]["event_id"]
        product =  message["rollback_bet_settlement"]["product"]
        
        
        fixture = Fixture.find_by(event_id: event_id)
        if fixture
            
            #iterate over the outcomes and mark the markets as settled
            if message["rollback_bet_settlement"].has_key?("market")
                if message["rollback_bet_settlement"]["market"].is_a?(Array)
                    message["rollback_bet_settlement"]["market"].each do |market|
                        if ["1","60", "10", "63", "18","68", "29", "75", "16", "66"].include?(market["id"]) 
                            producer_type = {
                                "1" => "Live",
                                "3" => "Pre"
                            }
                            
                            model_name = "Market" + market["id"] + producer_type[product]
                            mkt_entry = model_name.constantize.find_by(event_id: event_id, status: "Settled")
                            if mkt_entry
                                mkt_entry.update_attributes(status: "Deactivated", outcome: nil) 
                                #rollback the settlement on the bets
                                rollback_settled_bets(fixture.id, product, market["id"])
                            end
                        end
                    end
                end
            end
            
            if message["rollback_bet_settlement"].has_key?("market") && message["rollback_bet_settlement"]["market"].is_a?(Hash)
                producer_type = {
                    "1" => "Live",
                    "3" => "Pre"
                }
                if ["1","60", "10", "63", "18","68", "29", "75", "16", "66"].include?(message["rollback_bet_settlement"]["market"]["id"])
                    model_name = "Market" + message["rollback_bet_settlement"]["market"]["id"] + producer_type[product] 
                    mkt_entry = model_name.constantize.find_by(event_id: event_id)
                    
                    if mkt_entry
                        mkt_entry.update_attributes(status: "Deactivated", outcome: nil)
                        #rollback the settlement on the bets
                        rollback_settled_bets(fixture.id, product, message["rollback_bet_settlement"]["market"]["id"])
                    end
                end
            end
        end
        
        
    end
    
    def rollback_settled_bets(fixture_id, product, market_id)
        #call worker to settle these bets
        Soccer::RollbackSettledBetsWorker.perform_async(fixture_id, product, market_id)
    end
    
    
end