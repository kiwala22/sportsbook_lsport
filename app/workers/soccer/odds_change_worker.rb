require 'sidekiq'

class Soccer::OddsChangeWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical"
    sidekiq_options retry: false
    
    
    
    def perform(payload)
        
        soccer_markets = []
        
        soccer_status = {
            "0" => "not_started",
            "1" => "live",
            "2" => "suspended",
            "3" => "ended",
            "4" => "closed", 
            "5" => "cancelled",
            "6" => "delayed",
            "7" => "interrupted",
            "8" => "postponed",
            "9" => "abandoned"
        }
        
        #convert the message from the xml to an easr ruby Hash using active support
        message = Hash.from_xml(payload)
        event_id = message["odds_change"]["event_id"]
        product = message["odds_change"]["product"]
        
        update_attr = {
            
        }
        
        if message["odds_change"].has_key?("sport_event_status")
            if message["odds_change"]["sport_event_status"].has_key?('status')
                status = message["odds_change"]["sport_event_status"]["status"]
                update_attr["status"] = soccer_status[status] 
            end
            
            if message["odds_change"]["sport_event_status"].has_key?('match_status')
                update_attr["match_status"] = message["odds_change"]["sport_event_status"]["match_status"]
            end
            
            if message["odds_change"]["sport_event_status"].has_key?('home_score')
                update_attr["home_score"] = message["odds_change"]["sport_event_status"]["home_score"]
            end
            
            if message["odds_change"]["sport_event_status"].has_key?('away_score')
                update_attr["away_score"] = message["odds_change"]["sport_event_status"]["away_score"]
            end
        end
        
        
        #find the fixture and update the fixture
        fixture = Fixture.find_by(event_id: event_id)
        if fixture
            fixture.update(update_attr)
            #extract fixture information and update the fixtures with score and match status
            if message["odds_change"].has_key?("odds") && message["odds_change"]["odds"].present?
                if message["odds_change"]["odds"].has_key?("market") && message["odds_change"]["odds"]["market"].present?
                    if message["odds_change"]["odds"]["market"].is_a?(Array)
                        message["odds_change"]["odds"]["market"].each do |market|
                            process_market(market, product, event_id)  
                        end
                    end
                    if message["odds_change"]["odds"]["market"].is_a?(Hash)
                        process_market(message["odds_change"]["odds"]["market"], product, event_id)  
                    end
                end
            end
            
            
        end
    end
    
    def process_market(market, product, event_id)
        
        market_status = {
            "1" => "Active",
            "-1" => "Suspended",
            "0" => "Deactivated",
            "-4" => "Cancelled",
            "-3" => "Settled"
        }
        
        producer_type = {
            "1" => "Live",
            "3" => "Pre"
        }
        
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
