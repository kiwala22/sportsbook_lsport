require 'sidekiq'

class Soccer::OddsChangeWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical"
    sidekiq_options retry: false
    
    
    
    def perform(payload)
        
        soccer_markets = []
        
        soccer_status = {
            "0" => "not started",
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
        match_status = nil
        home_score = nil
        away_score = nil
        
        if message["odds_change"].has_key?("sport_event_status")
            if message["odds_change"]["sport_event_status"].has_key?('status')
                status = message["odds_change"]["sport_event_status"]["status"]
            end

            if message["odds_change"]["sport_event_status"].has_key?('match_status')
                match_status = message["odds_change"]["sport_event_status"]["match_status"]
            end
            
            if message["odds_change"]["sport_event_status"].has_key?('home_score')
                home_score = message["odds_change"]["sport_event_status"]["home_score"]
            end
            
            if message["odds_change"]["sport_event_status"].has_key?('away_score')
                away_score = message["odds_change"]["sport_event_status"]["away_score"]
            end
        end
        
        
        #find the fixture and update the fixture
        fixture = SoccerFixture.where(event_id: event_id).order("created_at DESC").first
        if fixture
            fixture.update(home_score: home_score, away_score: away_score, match_status: match_status, status: soccer_status[status] )
            #extract fixture information and update the fixtures with score and match status
            if message["odds_change"].has_key?("odds")
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
            model_name.constantize.find_or_create_by(event_id: event_id)  do |mkt|
                mkt.competitor1 =  comp1_odds
                mkt.competitor2 = comp2_odds
                mkt.draw =  draw_odds
                mkt.status = market_status[market["status"]]
                
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
            model_name.constantize.find_or_create_by(event_id: event_id)  do |mkt|
                mkt.competitor1_draw =  comp1_draw_odds
                mkt.competitor1_competitor2 = comp1_comp2_odds
                mkt.draw_competitor2 =  draw_comp2_odds
                mkt.status = market_status[market["status"]]
                
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
            model_name.constantize.find_or_create_by(event_id: event_id)  do |mkt|
                mkt.under =  under_odds
                mkt.over = over_odds
                mkt.threshold = 2.5
                mkt.status = market_status[market["status"]]
                
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
            model_name.constantize.find_or_create_by(event_id: event_id)  do |mkt|
                mkt.yes =  yes_odds
                mkt.no = no_odds
                mkt.status = market_status[market["status"]]
                
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
            model_name.constantize.find_or_create_by(event_id: event_id)  do |mkt|
                mkt.competitor1 =  comp1_odds
                mkt.competitor2 = comp2_odds
                mkt.threshold = 1
                mkt.status = market_status[market["status"]]
                
            end
            
        end
    end
end
