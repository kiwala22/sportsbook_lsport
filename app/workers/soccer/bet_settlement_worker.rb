require 'sidekiq' 
require 'json'

class Soccer::BetSettlementWorker
    include Sidekiq::Worker
    sidekiq_options queue: "default"
    sidekiq_options retry: false
    
    def perform(payload)
        #convert the message from the xml to an easr ruby Hash using active support
        message = Hash.from_xml(payload)
        event_id = message["bet_settlement"]["event_id"]
        product =  message["bet_settlement"]["product"]
        
        if message["bet_settlement"]["certainty"] == "2"
            #check if there are nay voided
            
            #update fixture as ended
            fixture = Fixture.find_by(event_id: event_id)
            if fixture
                fixture.update_attributes(status: "ended")
            end
            
            #iterate over the outcomes and mark the markets as settled
            if message["bet_settlement"].has_key?("outcomes") && message["bet_settlement"]["outcomes"].present?
                if message["bet_settlement"]["outcomes"].has_key?("market") && message["bet_settlement"]["outcomes"]["market"].present?
                    if message["bet_settlement"]["outcomes"]["market"].is_a?(Array)
                        message["bet_settlement"]["outcomes"]["market"].each do |market|
                            #record the match outcomes
                            process_market(market, product, event_id, fixture.id)  
                            
                            #run through all the bets with event_id and settle them
                            #call bet settlement worker        
                        end
                    end
                    
                    if message["bet_settlement"]["outcomes"]["market"].is_a?(Hash)
                        #record the match outcomes
                        process_market(message["bet_settlement"]["outcomes"]["market"], product, event_id, fixture.id)  
                        
                        #run through all the bets with event_id and settle them
                        #call bet settlement worker        
                    end
                end
                
            end
            
        end
    end
    
    def process_market(market, product, event_id, fixture_id)
        producer_type = {
            "1" => "Live",
            "3" => "Pre"
        }

        outcome_attr = {}
        
        update_attr = {}

        model_name = "Market" + market["id"] + producer_type[product]
        
        #hard code market with similar outcomes
        if market["id"] == "1" || market["id"] == "60"
            
            if market.has_key?("outcome")
                market["outcome"].each do |out|
                    if out["id"] == "1"
                        outcome_attr["1"] = out["result"]
                        outcome_attr["void_factor"] = out["void_factor"]
                    end
                    if out["id"] == "2"
                        outcome_attr["2"] = out["result"]
                        outcome_attr["void_factor"] = out["void_factor"]
                    end
                    if out["id"] == "3"
                        outcome_attr["3"] = out["result"]
                        outcome_attr["void_factor"] = out["void_factor"]
                    end
                end
            end

            if market.has_key?("void_reason")
                update_attr["void_reason"] = market["void_reason"]
            end

            update_attr["outcome"] = outcome_attr.to_json

            #update or create markets 1X2 half time and fulltime
            mkt_entry = model_name.constantize.find_by(event_id: event_id)
            if mkt_entry
                mkt_entry.update_attributes(update_attr)
            else
                mkt_entry = model_name.constantize.new(update_attr)
                mkt_entry.event_id = event_id
                mkt_entry.save
            end
            settle_bets(fixture_id, product, market["id"], update_attr["outcome"])
        end
        
        if market["id"] == "10" || market["id"] == "63"
            #update or create markets double chance half time and fulltime
            
            if market.has_key?("outcome")
                market["outcome"].each do |out|
                    if out["id"] == "9"
                        outcome_attr["9"] = out["result"]
                        outcome_attr["void_factor"] = out["void_factor"]
                    end
                    if out["id"] == "10"
                        outcome_attr["10"] = out["result"]
                        outcome_attr["void_factor"] = out["void_factor"]
                    end
                    if out["id"] == "11"
                        outcome_attr["11"] = out["result"]
                        outcome_attr["void_factor"] = out["void_factor"]
                    end
                end
            end

            if market.has_key?("void_reason")
                update_attr["void_reason"] = market["void_reason"]
            end

            update_attr["outcome"] = outcome_attr.to_json

            #update or create markets 1X2 half time and fulltime
            mkt_entry = model_name.constantize.find_by(event_id: event_id)
            
            if mkt_entry
                mkt_entry.update_attributes(update_attr)
            else
                mkt_entry = model_name.constantize.new(update_attr)
                mkt_entry.event_id = event_id
                mkt_entry.save
            end
            settle_bets(fixture_id, product, market["id"], update_attr["outcome"])
        end
        
        if (market["id"] == "18" || market["id"] == "68") && market["specifiers"] == "total=2.5"
            #update or create markets under and over half time and fulltime
            
            if market.has_key?("outcome")
                market["outcome"].each do |out|
                    if out["id"] == "12"
                        outcome_attr["12"] = out["result"]
                        outcome_attr["void_factor"] = out["void_factor"]
                    end
                    if out["id"] == "13"
                        outcome_attr["13"] = out["result"]
                        outcome_attr["void_factor"] = out["void_factor"]
                    end
                    
                end
            end

            if market.has_key?("void_reason")
                update_attr["void_reason"] = market["void_reason"]
            end

            update_attr["outcome"] = outcome_attr.to_json

            #update or create markets 1X2 half time and fulltime
            mkt_entry = model_name.constantize.find_by(event_id: event_id)
            if mkt_entry
                mkt_entry.update_attributes(update_attr)
            else
                mkt_entry = model_name.constantize.new(update_attr)
                mkt_entry.event_id = event_id
                mkt_entry.save
            end
            settle_bets(fixture_id, product, market["id"], update_attr["outcome"])
        end
        
        if market["id"] == "29" || market["id"] == "75"
            #update or create markets both to score half time and fulltime
            
            if market.has_key?("outcome")
                market["outcome"].each do |out|
                    if out["id"] == "74"
                        outcome_attr["74"] = out["result"]
                        outcome_attr["void_factor"] = out["void_factor"]
                    end
                    if out["id"] == "76"
                        outcome_attr["76"] = out["result"]
                        outcome_attr["void_factor"] = out["void_factor"]
                    end
                    
                end
            end
            #update or create markets 1X2 half time and fulltime
            if market.has_key?("void_reason")
                update_attr["void_reason"] = market["void_reason"]
            end

            update_attr["outcome"] = outcome_attr.to_json

            mkt_entry = model_name.constantize.find_by(event_id: event_id)
            if mkt_entry
                mkt_entry.update_attributes(update_attr)
            else
                mkt_entry = model_name.constantize.new(update_attr)
                mkt_entry.event_id = event_id
                mkt_entry.save
            end
            settle_bets(fixture_id, product, market["id"], update_attr["outcome"])
        end
        
        if (market["id"] == "16" ||  "66") && market["specifiers"] == "hcp=1"
            #update or create markets under and over half time and fulltime
            
            if market.has_key?("outcome")
                market["outcome"].each do |out|
                    if out["id"] == "1714"
                        outcome_attr["1714"] = out["result"]
                        outcome_attr["void_factor"] = out["void_factor"]
                    end
                    if out["id"] == "1715"
                        outcome_attr["1715"] = out["result"]
                        outcome_attr["void_factor"] = out["void_factor"]
                    end 
                    
                end
            end

            if market.has_key?("void_reason")
                update_attr["void_reason"] = market["void_reason"]
            end

            update_attr["outcome"] = outcome_attr.to_json

            #update or create markets 1X2 half time and fulltime
            mkt_entry = model_name.constantize.find_by(event_id: event_id)
            if mkt_entry
                mkt_entry.update_attributes(update_attr)
            else
                mkt_entry = model_name.constantize.new(update_attr)
                mkt_entry.event_id = event_id
                mkt_entry.save
            end  
            settle_bets(fixture_id, product, market["id"], update_attr["outcome"])
        end
    end

    def settle_bets(fixture_id, product, market_id, outcome)
        #call worker to settle these bets
        Soccer::CloseSettledBetsWorker.perform_async(fixture_id, product, market_id, outcome)
    end
    
end