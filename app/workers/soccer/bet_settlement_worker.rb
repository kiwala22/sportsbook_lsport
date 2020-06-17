require 'sidekiq' 

class Soccer::BetSettlementWorker
    include Sidekiq::Worker
    sidekiq_options queue: "default"
    sidekiq_options retry: false
    
    def perform(payload)
        #convert the message from the xml to an easr ruby Hash using active support
        message = Hash.from_xml(payload)
        event_id = message["bet_settlement"]["event_id"]
        product =  message["bet_settlement"]["product"]
        
        if message["bet_settlement"]["certainity"] == "2"
            #update fixture as ended
            fixture = Fixture.find_by(event_id: event_id)
            if fixture
                fixture.update_attributes(status: "ended")
            end
            
            #iterate over the outcomes and mark the markets as settled
            if message["bet_settlement"].has_key?("outcomes")
                if message["bet_settlement"]["outcomes"].has_key?("market") && message["bet_settlement"]["outcomes"]["market"].is_a?(Array)
                    message["bet_settlement"]["outcomes"]["market"].each do |market|
                        #record the match outcomes
                        process_market(market, product, event_id)  
                        
                        #run through all the bets with event_id and settle them
                    end
                end
                
                if message["bet_settlement"]["outcomes"].has_key?("market") && message["bet_settlement"]["outcomes"]["market"].is_a?(Hash)
                    #record the match outcomes
                    process_market(message["bet_settlement"]["outcomes"]["market"], product, event_id)  
                    
                    #run through all the bets with event_id and settle them
                end
                
            end
            
            def process_markets(market, product, event_id)
                model_name = "Market" + market["id"] + producer_type[product]
                
                #hard code market with similar outcomes
                comp1_odds = draw_odds = comp2_odds = nil
                if market["id"] == "1" || market["id"] == "60"
                    
                    if market.has_key?("outcome")
                        market["outcome"].each do |out|
                            if out["id"] == "1"
                                comp1_odds = out["odds"].to_f
                            end
                            if out["id"] == "2"
                                draw_odds = out["odds"].to_f
                            end
                            if out["id"] == "3"
                                comp2_odds = out["odds"].to_f
                            end
                        end
                    end
                    #update or create markets 1X2 half time and fulltime
                    mkt_entry = model_name.constantize.find_by(event_id: event_id)
                    update_attr = {
                        competitor1:  comp1_odds,
                        competitor2: comp2_odds,
                        draw: draw_odds,
                        status: market_status[market["status"]]
                    }
                    if mkt_entry
                        mkt_entry.update_attributes(update_attr)
                    else
                        mkt_entry = model_name.constantize.new(update_attr)
                        mkt_entry.event_id = event_id
                        mkt_entry.save
                    end
                    
                end
                
                comp1_draw_odds = comp1_comp2_odds = draw_comp2_odds = nil
                if market["id"] == "10" || market["id"] == "63"
                    #update or create markets double chance half time and fulltime
                    
                    if market.has_key?("outcome")
                        market["outcome"].each do |out|
                            if out["id"] == "9"
                                comp1_draw_odds = out["odds"].to_f
                            end
                            if out["id"] == "10"
                                comp1_comp2_odds = out["odds"].to_f
                            end
                            if out["id"] == "11"
                                draw_comp2_odds = out["odds"].to_f
                            end
                        end
                    end
                    #update or create markets 1X2 half time and fulltime
                    #update or create markets 1X2 half time and fulltime
                    mkt_entry = model_name.constantize.find_by(event_id: event_id)
                    update_attr = {
                        competitor1_draw:  comp1_draw_odds,
                        competitor1_competitor2: comp1_comp2_odds,
                        draw_competitor2:  draw_comp2_odds,
                        status: market_status[market["status"]]
                    }
                    if mkt_entry
                        mkt_entry.update_attributes(update_attr)
                    else
                        mkt_entry = model_name.constantize.new(update_attr)
                        mkt_entry.event_id = event_id
                        mkt_entry.save
                    end
                    
                end
                
                over_odds = under_odds = nil
                if (market["id"] == "18" || market["id"] == "68") && market["specifiers"] == "total=2.5"
                    #update or create markets under and over half time and fulltime
                    
                    if market.has_key?("outcome")
                        market["outcome"].each do |out|
                            if out["id"] == "12"
                                over_odds = out["odds"].to_f
                            end
                            if out["id"] == "13"
                                under_odds = out["odds"].to_f
                            end
                            
                        end
                    end
                    #update or create markets 1X2 half time and fulltime
                    mkt_entry = model_name.constantize.find_by(event_id: event_id)
                    update_attr = {
                        under:  under_odds,
                        over: over_odds,
                        threshold: 2.5,
                        status: market_status[market["status"]]
                    }
                    if mkt_entry
                        mkt_entry.update_attributes(update_attr)
                    else
                        mkt_entry = model_name.constantize.new(update_attr)
                        mkt_entry.event_id = event_id
                        mkt_entry.save
                    end
                    
                end
                
                yes_odds = no_odds = nil
                if market["id"] == "29" || market["id"] == "75"
                    #update or create markets both to score half time and fulltime
                    
                    if market.has_key?("outcome")
                        market["outcome"].each do |out|
                            if out["id"] == "74"
                                yes_odds = out["odds"].to_f
                            end
                            if out["id"] == "76"
                                no_odds = out["odds"].to_f
                            end
                            
                        end
                    end
                    #update or create markets 1X2 half time and fulltime
                    mkt_entry = model_name.constantize.find_by(event_id: event_id)
                    update_attr = {
                        yes:  yes_odds,
                        no: no_odds,
                        status: market_status[market["status"]]
                    }
                    if mkt_entry
                        mkt_entry.update_attributes(update_attr)
                    else
                        mkt_entry = model_name.constantize.new(update_attr)
                        mkt_entry.event_id = event_id
                        mkt_entry.save
                    end
                end
                
                comp1_odds = comp2_odds = nil
                if (market["id"] == "16" ||  "66") && market["specifiers"] == "hcp=1"
                    #update or create markets under and over half time and fulltime
                    
                    if market.has_key?("outcome")
                        market["outcome"].each do |out|
                            if out["id"] == "1714"
                                comp1_odds = out["odds"].to_f
                            end
                            if out["id"] == "1715"
                                comp2_odds = out["odds"].to_f
                            end 
                            
                        end
                    end
                    #update or create markets 1X2 half time and fulltime
                    mkt_entry = model_name.constantize.find_by(event_id: event_id)
                    update_attr = {
                        competitor1:  comp1_odds,
                        competitor2: comp2_odds,
                        threshold: 1,
                        status: market_status[market["status"]]
                    }
                    if mkt_entry
                        mkt_entry.update_attributes(update_attr)
                    else
                        mkt_entry = model_name.constantize.new(update_attr)
                        mkt_entry.event_id = event_id
                        mkt_entry.save
                    end    
                end
            end
            
        end
    end
    
end