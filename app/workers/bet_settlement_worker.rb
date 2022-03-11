require 'sidekiq' 
require 'json'

class BetSettlementWorker
    include Sidekiq::Worker
    sidekiq_options queue: "default", retry: false

    include MarketNames

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
                                    process_settlement(fixture.id, market, product, event_id, fixture.sport)
                                end

                            end
                            if event.has_key?("Markets") && event["Markets"].is_a?(Hash)
                                market = event["Markets"]
                                #process the market
                                process_settlement(fixture.id, market, product, event_id, fixture.sport)
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
                                process_settlement(fixture.id, market, product, event_id, fixture.sport)
                            end

                        end
                        if event.has_key?("Markets") && event["Markets"].is_a?(Hash)
                            market = event["Markets"]
                            #process the market
                            process_settlement(fixture.id, market, product, event_id, fixture.sport)
                        end
                    end
                end 
            end
        end
    end

    def process_settlement(fixture_id, market, product, event_id, sport)

        settlement_status = {
            -1 => "Cancelled",
            1 => "Loser",
            2 => "Winner",
            3 => "Refund",
            4 => "HalfLost",
            5 => "HalfWon"

        }

        producer_type = {
            "1" => "Live",
            "3" => "Pre"
        }

        outcome_attr = {}

        #model_name = "Market" + (market["Id"]).to_s + producer_type[product]
        model_name = producer_type[product] + "Market"
        
        update_attr = {
            "status" => "Settled"
        }

        if market.has_key?("Providers")
            market["Providers"].each do |provider|
                if provider.has_key?("Bets")
                    if provider["Bets"].any? { |el| el.has_key?("BaseLine") }
                        bets = provider["Bets"].group_by{ |vl| vl["BaseLine"]}
                        bets.each do |key, value|
                            mkt_entry = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: market["Id"], specifier: key)
                            update_attr["specifier"] = key
                            value.each do |bet|
                                outcome_attr.store(bet["Name"],settlement_status[bet["Settlement"]])
                            end

                            update_attr["results"] = outcome_attr

                            ##Save the market with specifier
                            if mkt_entry
                                mkt_entry.assign_attributes(update_attr)
                                mkt_entry.save
                            else
                                mkt_entry = model_name.constantize.new(update_attr)
                                mkt_entry.fixture_id = fixture_id
                                mkt_entry.market_identifier = market["Id"]
                                mkt_entry.name = market_name(market["Id"], sport)
                                mkt_entry.save
                            end

                            settle_bets(fixture_id, product, market["Id"], update_attr["results"], update_attr["specifier"])

                            outcome_attr = {}
                            update_attr = {
                                "status" => "Settled"
                            }
                        end
                    else
                        mkt_entry = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: market["Id"])

                        provider["Bets"].each do |bet|
                            outcome_attr.store(bet["Name"],settlement_status[bet["Settlement"]])
                        end
                        update_attr["results"] = outcome_attr

                        if mkt_entry
                            mkt_entry.assign_attributes(update_attr)
                            mkt_entry.save
                        else
                            mkt_entry = model_name.constantize.new(update_attr)
                            mkt_entry.fixture_id = fixture_id
                            mkt_entry.market_identifier = market["Id"]
                            mkt_entry.name = market_name(market["Id"], sport)
                            mkt_entry.save
                        end

                        settle_bets(fixture_id, product, market["Id"], update_attr["results"], update_attr["specifier"])

                        outcome_attr = {}
                        update_attr = {
                            "status" => "Settled"
                        }
                    end
                end
            end
        end

    end

    def settle_bets(fixture_id, product, market_id, outcome, specifier=nil)
        #call worker to settle these bets
        CloseSettledBetsWorker.perform_async(fixture_id, product, market_id, outcome, specifier)
    end
    
end