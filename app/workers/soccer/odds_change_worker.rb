require 'sidekiq' 

class OddsChangeWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical"
    sidekiq_options retry: false

    

    def perform(payload)
        
        soccer_markets = []

        soccer_status = {
            "0" => "Not Started",
            "1" => "Live",
            "2" => "Suspended",
            "3" => "Ended",
            "4" => "closed"
        }

        market_status = {
            "1" => "Active",
            "-1" => "Suspended",
            "0" => "Deactivated",
            "-4" => "Cancelled",
            "-3" => "Settled"
        }

       #convert the message from the xml to an easr ruby Hash using active support
        message = Hash.from_xml(payload)
        event_id = message["odds_change"]["event_id"]
        product = message["odds_change"]["product"]
        match_status = message["odds_change"]["sport_event_status"]["match_status"]
        home_score = message["odds_change"]["sport_event_status"]
        away_score = message["odds_change"]["sport_event_status"]

        #find the fixture and update the fixture
        fixture = db[:soccer_fixtures].where(event_id: event_id).order(:id).last
        if fixture
            fixture.update(home_score: home_score, away_score: away_score, match_status: soccer_status[match_status])
        end

        #extract fixture information and update the fixtures with score and match status
        if message["odds_change"]["sport_event_status"].has_key?("odds")
            message["odds_change"]["sport_event_status"]["odds"].each do |market|

                producer_type = {
                    "1" => "lives",
                    "3" => "pres"
                }

                table_sym = "market" + market["id"] + "_" + producer_type[product]
                table_sym = table_name.to_sym

                #hard code market with similar outcomes
                if market["id"] == "1" || market["id"] == "60"
                    market.each do |out|
                        if out["id"] == "1"
                            comp1_odds = out["odds"]
                        end
                        if out["id"] == "2"
                            draw_odds = out["odds"]
                        end
                        if out["id"] == "3"
                            comp2_odds = out["odds"]
                        end
                    end
                    #update or create markets 1X2 half time and fulltime
                    db[table_sym].update_or_create(event_id: event_id)  do |mkt|
                        mkt.competitor1 =  comp1_odds
                        mkt.competitor2 = comp2_odds
                        mkt.draw =  draw_odds
                        mkt.status = market_status[market["status"]]
                        mkt.created_at = Time.now
                        mkt.updated_at = Time.now

                    end
                end

                if market["id"] == "10" || market["id"] == "63"
                    #update or create markets double chance half time and fulltime
                    market.each do |out|
                        if out["id"] == "9"
                            comp1_draw_odds = out["odds"]
                        end
                        if out["id"] == "10"
                            comp1_comp2_odds = out["odds"]
                        end
                        if out["id"] == "11"
                            draw_comp2_odds = out["odds"]
                        end
                    end
                    #update or create markets 1X2 half time and fulltime
                    db[table_sym].update_or_create(event_id: event_id)  do |mkt|
                        mkt.competitor1_draw =  comp1_draw_odds
                        mkt.competitior1_competitior2 = comp1_comp2_odds
                        mkt.draw_competitor2 =  draw_comp2_odds
                        mkt.status = market_status[market["status"]]
                        mkt.created_at = Time.now
                        mkt.updated_at = Time.now

                    end
                    
                end

                if (market["id"] == "18" || market["id"] == "68") && market["specifiers"] == "total=2.5"
                    #update or create markets under and over half time and fulltime
                    market.each do |out|
                        if out["id"] == "12"
                            over_odds = out["odds"]
                        end
                        if out["id"] == "13"
                            under_odds = out["odds"]
                        end
                        
                    end
                    #update or create markets 1X2 half time and fulltime
                    db[table_sym].update_or_create(event_id: event_id)  do |mkt|
                        mkt.under =  under_odds
                        mkt.over = over_odds
                        mkt.threshold = 2.5
                        mkt.status = market_status[market["status"]]
                        mkt.created_at = Time.now
                        mkt.updated_at = Time.now

                    end
    
                end

                if market["id"] == "29" || market["id"] == "75"
                    #update or create markets both to score half time and fulltime
                    market.each do |out|
                        if out["id"] == "74"
                            yes_odds = out["odds"]
                        end
                        if out["id"] == "76"
                            no_odds = out["odds"]
                        end
                        
                    end
                    #update or create markets 1X2 half time and fulltime
                    db[table_sym].update_or_create(event_id: event_id)  do |mkt|
                        mkt.yes =  yes_odds
                        mkt.no = no_odds
                        mkt.status = market_status[market["status"]]
                        mkt.created_at = Time.now
                        mkt.updated_at = Time.now

                    end
                end

                if (market["id"] == "16" || market["id"] == "66") && market["specifiers"] == "hcp=1"
                     #update or create markets under and over half time and fulltime
                     market.each do |out|
                        if out["id"] == "1714"
                            comp1_odds = out["odds"]
                        end
                        if out["id"] == "1715"
                            comp2_odds = out["odds"]
                        end
                        
                    end
                    #update or create markets 1X2 half time and fulltime
                    db[table_sym].update_or_create(event_id: event_id)  do |mkt|
                        mkt.competitor1 =  comp1_odds
                        mkt.competitor2 = comp2_odds
                        mkt.threshold = 1
                        mkt.status = market_status[market["status"]]
                        mkt.created_at = Time.now
                        mkt.updated_at = Time.now

                    end
    
                end
            end
        end


        db.disconnect


    end
    
end