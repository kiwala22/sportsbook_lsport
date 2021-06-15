require 'sidekiq' 
require 'json'

class BetSettlementWorker
    include Sidekiq::Worker
    sidekiq_options queue: "default", retry: false

    def perform(message, routing_key)
        if routing_key == "pre_match"
            product = "3"
        end

        if routing_key == "in_play"
            product = "1"
        end

        update_attr = {
            
        }

        if message["Body"].has_key?("Events") 
            if message["Body"]["Events"].is_a?(Array) 
                message["Body"]["Events"].each do |event|
                    if event.has_key?("FixtureId")
                        event_id = event["FixtureId"]
                        fixture = Fixture.find_by(event_id: event_id)
                        if fixture
                            fixture.update(status: "ended")
                            #check if there is a markets key and if it is an arrary on a hash
                            if event.has_key?("Markets") && event["Markets"].is_a?(Array)
                                event["Markets"].each do |market|
                                    #process the market
                                    process_settlement(fixture.id, market, product, event_id)
                                end

                            end
                            if event.has_key?("Markets") && event["Markets"].is_a?(Hash)
                                market = event["Markets"]
                                #process the market
                                process_settlement(fixture.id, market, product, event_id)
                            end
                        end
                    end
                end
            end

            if message["Body"]["Events"].is_a?(Hash) 
                event = message["Body"]["Events"]
               if event.has_key?("FixtureId")
                    event_id = event["FixtureId"]
                    fixture = Fixture.find_by(event_id: event_id)
                    if fixture
                        fixture.update(status: "ended")
                        #check if there is a markets key and if it is an arrary on a hash
                        if event.has_key?("Markets") && event["Markets"].is_a?(Array)
                            event["Markets"].each do |market|
                                #process the market
                                process_settlement(fixture.id, market, product, event_id)
                            end

                        end
                        if event.has_key?("Markets") && event["Markets"].is_a?(Hash)
                            market = event["Markets"]
                            #process the market
                            process_settlement(fixture.id, market, product, event_id)
                        end
                    end
                end 
            end
        end
    end

    def process_settlement(fixture_id, market, product, event_id)

        settlement_status = {
            "-1" => "Cancelled",
            "1" => "Loser",
            "2" => "Winner",
            "3" => "Refund",
            "4" => "HalfLost",
            "5" => "HalfWon"

        }

        producer_type = {
            "1" => "Live",
            "3" => "Pre"
        }

        outcome_attr = {}
        
        update_attr = {
            "status" => "Settled"
        }

        model_name = "Market" + market["Id"] + producer_type[product]

        mkt_entry = model_name.constantize.find_by(fixture_id: fixture_id)
        update_attr = {}

        if (market["Id"] == 2 || market["Id"] == 77) && market["MainLine"] == "2.5"
            if market.has_key?("Providers")
                market["Providers"].each do |provider|
                    if provider.has_key?("Bets")
                        provider["Bets"].each do |bet|
                            outcome_attr[bet["Name"].downcase] = bet["Settlement"]
                        end
                    end
                end
                update_attr["outcome"] = outcome_attr.to_json
            end

        elsif  (market["Id"] == 3 || market["Id"] == 53) && market["MainLine"] = "1.0"
            if market.has_key?("Providers")
                market["Providers"].each do |provider|
                    if provider.has_key?("Bets")
                        provider["Bets"].each do |bet|
                            outcome_attr[bet["Name"].downcase] = bet["Settlement"]
                        end
                    end
                end
                update_attr["outcome"] = outcome_attr.to_json
            end
        else
            if market.has_key?("Providers")
                market["Providers"].each do |provider|
                    if provider.has_key?("Bets")
                        provider["Bets"].each do |bet|
                            outcome_attr[bet["Name"].downcase] = bet["Settlement"]
                        end
                    end
                end
                update_attr["outcome"] = outcome_attr.to_json
            end
        end

        if mkt_entry
                mkt_entry.assign_attributes(update_attr)
        else
            mkt_entry = model_name.constantize.new(update_attr)
            mkt_entry.fixture_id = fixture_id
            mkt_entry.event_id = event_id
            mkt_entry.save
        end

        settle_bets(fixture_id, product, market["Id"], update_attr["outcome"])

    end

    def settle_bets(fixture_id, product, market_id, outcome)
        #call worker to settle these bets
        CloseSettledBetsWorker.perform_async(fixture_id, product, market_id, outcome)
    end
    
end