require 'sidekiq'

class OddsChangeWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical", retry: false
    
    
    
    def perform(message, sport=nil, event=nil)
        
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
            if message["odds_change"]["sport_event_status"].has_key?('clock') && message["odds_change"]["sport_event_status"]["clock"].has_key?('match_time') 
                update_attr["match_time"] = message["odds_change"]["sport_event_status"]["clock"]["match_time"]
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
                            process_market(fixture.id, market, product, event_id)  
                        end
                    end
                    if message["odds_change"]["odds"]["market"].is_a?(Hash)
                        process_market(fixture.id,message["odds_change"]["odds"]["market"], product, event_id)  
                    end
                end
            end
            
            
        end
    end
    
    def process_market(fixture_id, market, product, event_id)
        
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
        outcome_1 = outcome_2 = outcome_3 = 1.00
        if market["id"] == "1" || market["id"] == "60"
            
            if market.has_key?("outcome")
                market["outcome"].each do |out|
                    if out["id"] == "1"
                        outcome_1 = out["odds"].to_f unless out["odds"].nil?
                    end
                    if out["id"] == "2"
                        outcome_2 = out["odds"].to_f unless out["odds"].nil?
                    end
                    if out["id"] == "3"
                        outcome_3 = out["odds"].to_f unless out["odds"].nil?
                    end
                end
            end
            #update or create markets 1X2 half time and fulltime
            mkt_entry = model_name.constantize.find_by(event_id: event_id)
            update_attr = {
                outcome_1:  outcome_1,
                outcome_2: outcome_2,
                outcome_3: outcome_3,
                status: market_status[market["status"]]
            }
            if mkt_entry.present?
                mkt_entry.assign_attributes(update_attr)
            else
                mkt_entry = model_name.constantize.new(update_attr)
                mkt_entry.fixture_id = fixture_id
                mkt_entry.event_id = event_id
                #mkt_entry.save
            end
            mkt_entry.save!
        end
        
        outcome_9 = outcome_10 = outcome_11 = 1.00
        if market["id"] == "10" || market["id"] == "63"
            #update or create markets double chance half time and fulltime
            
            if market.has_key?("outcome")
                market["outcome"].each do |out|
                    if out["id"] == "9"
                        outcome_9 = out["odds"].to_f unless out["odds"].nil?
                    end
                    if out["id"] == "10"
                        outcome_10 = out["odds"].to_f unless out["odds"].nil?
                    end
                    if out["id"] == "11"
                        outcome_11 = out["odds"].to_f unless out["odds"].nil?
                    end
                end
            end
            #update or create markets 1X2 half time and fulltime
            #update or create markets 1X2 half time and fulltime
            mkt_entry = model_name.constantize.find_by(event_id: event_id)
            update_attr = {
                outcome_9: outcome_9,
                outcome_10: outcome_10,
                outcome_11: outcome_11,
                status: market_status[market["status"]]
            }
            if mkt_entry.present?
                mkt_entry.assign_attributes(update_attr)
            else
                mkt_entry = model_name.constantize.new(update_attr)
                mkt_entry.fixture_id = fixture_id
                mkt_entry.event_id = event_id
                #mkt_entry.save
            end
            mkt_entry.save!
            
        end
        
        outcome_12 = outcome_13 = 1.00
        if (market["id"] == "18" || market["id"] == "68") && market["specifiers"] == "total=2.5"
            #update or create markets under and over half time and fulltime
            
            if market.has_key?("outcome")
                market["outcome"].each do |out|
                    if out["id"] == "12"
                        outcome_12 = out["odds"].to_f unless out["odds"].nil?
                    end
                    if out["id"] == "13"
                        outcome_13 = out["odds"].to_f unless out["odds"].nil?
                    end
                    
                end
            end
            #update or create markets 1X2 half time and fulltime
            mkt_entry = model_name.constantize.find_by(event_id: event_id)
            update_attr = {
                outcome_12:  outcome_12,
                outcome_13:   outcome_13,
                total: 2.5,
                status: market_status[market["status"]]
            }
            if mkt_entry.present?
                mkt_entry.assign_attributes(update_attr)
            else
                mkt_entry = model_name.constantize.new(update_attr)
                mkt_entry.fixture_id = fixture_id
                mkt_entry.event_id = event_id
                #mkt_entry.save
            end
            mkt_entry.save!
            
        end
        
        outcome_74 = outcome_76 = 1.00
        if market["id"] == "29" || market["id"] == "75"
            #update or create markets both to score half time and fulltime
            
            if market.has_key?("outcome")
                market["outcome"].each do |out|
                    if out["id"] == "74"
                        outcome_74 = out["odds"].to_f unless out["odds"].nil?
                    end
                    if out["id"] == "76"
                        outcome_76 = out["odds"].to_f unless out["odds"].nil?
                    end
                    
                end
            end
            #update or create markets 1X2 half time and fulltime
            mkt_entry = model_name.constantize.find_by(event_id: event_id)
            update_attr = {
                outcome_74:  outcome_74,
                outcome_76: outcome_76,
                status: market_status[market["status"]]
            }
            if mkt_entry.present?
                mkt_entry.assign_attributes(update_attr)
            else
                mkt_entry = model_name.constantize.new(update_attr)
                mkt_entry.fixture_id = fixture_id
                mkt_entry.event_id = event_id
                #mkt_entry.save
            end
            mkt_entry.save!
        end
        
        outcome_1714 = outcome_1715 = 1.00
        if (market["id"] == "16" || market["id"] == "66") && market["specifiers"] == "hcp=1"
            #update or create markets under and over half time and fulltime
            
            if market.has_key?("outcome")
                market["outcome"].each do |out|
                    if out["id"] == "1714"
                        outcome_1714 = out["odds"].to_f unless out["odds"].nil?
                    end
                    if out["id"] == "1715"
                        outcome_1715 = out["odds"].to_f unless out["odds"].nil?
                    end
                    
                end
            end
            #update or create markets 1X2 half time and fulltime
            mkt_entry = model_name.constantize.find_by(event_id: event_id)
            update_attr = {
                outcome_1714:  outcome_1714,
                outcome_1715: outcome_1715,
                hcp: 1,
                status: market_status[market["status"]]
            }
            if mkt_entry.present?
                mkt_entry.assign_attributes(update_attr)
            else
                mkt_entry = model_name.constantize.new(update_attr)
                mkt_entry.fixture_id = fixture_id
                mkt_entry.event_id = event_id
                #mkt_entry.save
            end  
            mkt_entry.save!
        end
    end
end
