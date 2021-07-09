module Markets
    def pre_match_market_creation(fixture_id_array)
        fixture_id_array.each do |fixture_id|
            fixture = Fixture.find(fixture_id)
    
            if fixture
                fixture.update(status: "not_started", start_date: (Date.today + 6.months))
                fixture_id = fixture.id
                event_id = fixture.event_id
    
                ["1", "282"].each do |mkt|
                    model_name = "Market"+mkt+"Pre"
                    market = model_name.constantize.find_by(fixture_id: fixture_id)
                    if market
                        market.update(status: "Active")
                    else
                        attrs = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00), "outcome_X" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.event_id = event_id
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end
    
                ["25", "7"].each do |mkt|
                    model_name = "Market"+mkt+"Pre"
                    market = model_name.constantize.find_by(fixture_id: fixture_id)
                    if market
                        market.update(status: "Active")
                    else
                        attrs = {"outcome_12" => rand(1.00..20.00), "outcome_1X" => rand(1.00..20.00), "outcome_X2" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.event_id = event_id
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end
    
                ["2", "77"].each do |mkt|
                    model_name = "Market"+mkt+"Pre"
                    market = model_name.constantize.find_by(fixture_id: fixture_id)
                    if market
                        market.update(status: "Active")
                    else
                        attrs = {"outcome_Under" => rand(1.00..20.00), "outcome_Over" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.event_id = event_id
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end
    
                ["3", "53"].each do |mkt|
                    model_name = "Market"+mkt+"Pre"
                    market = model_name.constantize.find_by(fixture_id: fixture_id)
                    if market
                        market.update(status: "Active")
                    else
                        attrs = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.event_id = event_id
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end
    
                ["17", "113"].each do |mkt|
                    model_name = "Market"+mkt+"Pre"
                    market = model_name.constantize.find_by(fixture_id: fixture_id)
                    if market
                        market.update(status: "Active")
                    else
                        attrs = {"outcome_Yes" => rand(1.00..20.00), "outcome_No" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.event_id = event_id
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end
            end
        end
    end

    def live_match_market_creation(fixture_id_array)
        fixture_id_array.each do |fixture_id|
            fixture = Fixture.find(fixture_id)

            if fixture
                home_score = rand(5)
                away_score = rand(5)
                seconds = rand(5400)
                match_time = "#{seconds/60}:#{seconds%60}"
                fixture.update(status: "live", match_time: match_time, home_score: "#{home_score}", away_score: "#{away_score}")
                fixture_id = fixture.id
                event_id = fixture.event_id

                ["1", "282"].each do |mkt|
                    model_name = "Market"+mkt+"Live"
                    market = model_name.constantize.find_by(fixture_id: fixture_id)
                    if market
                        market.update(status: "Active")
                    else
                        attrs = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00), "outcome_X" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.event_id = event_id
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end

                ["25", "7"].each do |mkt|
                    model_name = "Market"+mkt+"Live"
                    market = model_name.constantize.find_by(fixture_id: fixture_id)
                    if market
                        market.update(status: "Active")
                    else
                        attrs = {"outcome_12" => rand(1.00..20.00), "outcome_1X" => rand(1.00..20.00), "outcome_X2" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.event_id = event_id
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end

                ["2", "77"].each do |mkt|
                    model_name = "Market"+mkt+"Live"
                    market = model_name.constantize.find_by(fixture_id: fixture_id)
                    if market
                        market.update(status: "Active")
                    else
                        attrs = {"outcome_Under" => rand(1.00..20.00), "outcome_Over" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.event_id = event_id
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end

                ["3", "53"].each do |mkt|
                    model_name = "Market"+mkt+"Live"
                    market = model_name.constantize.find_by(fixture_id: fixture_id)
                    if market
                        market.update(status: "Active")
                    else
                        attrs = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.event_id = event_id
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end

                ["17", "113"].each do |mkt|
                    model_name = "Market"+mkt+"Live"
                    market = model_name.constantize.find_by(fixture_id: fixture_id)
                    if market
                        market.update(status: "Active")
                    else
                        attrs = {"outcome_Yes" => rand(1.00..20.00), "outcome_No" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.event_id = event_id
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end
            end
        end
    end
end