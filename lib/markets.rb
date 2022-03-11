module Markets

    include MarketNames

    def pre_match_market_creation(fixture_id_array)
        model_name = "PreMarket"
        fixture_id_array.each do |fixture_id|
            fixture = Fixture.find(fixture_id)
    
            if fixture
                fixture.update(status: "not_started", start_date: (Date.today + 6.months))
                fixture_id = fixture.id
                event_id = fixture.event_id
    
                [1, 282].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active")
                    else
                        attrs["odds"] = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00), "outcome_X" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end
    
                [25, 7].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active")
                    else
                        attrs["odds"] = {"outcome_12" => rand(1.00..20.00), "outcome_1X" => rand(1.00..20.00), "outcome_X2" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end
    
                [2, 77, 28].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active")
                    else
                        attrs["odds"] = {"outcome_Under" => rand(1.00..20.00), "outcome_Over" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end
    
                [3, 63].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active")
                    else
                        attrs["odds"] = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end
    
                [17, 113].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active")
                    else
                        attrs["odds"] = {"outcome_Yes" => rand(1.00..20.00), "outcome_No" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end
            end
        end
    end

    def live_match_market_creation(fixture_id_array)
        model_name = "LiveMarket"
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

                [1, 282].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active")
                    else
                        attrs["odds"] = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00), "outcome_X" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end

                [25, 7].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active")
                    else
                        attrs["odds"] = {"outcome_12" => rand(1.00..20.00), "outcome_1X" => rand(1.00..20.00), "outcome_X2" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end

                [2, 77, 28].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active")
                    else
                        attrs["odds"] = {"outcome_Under" => rand(1.00..20.00), "outcome_Over" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end

                [3, 63].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active")
                    else
                        attrs["odds"] = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end

                [17, 113].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active")
                    else
                        attrs["odds"] = {"outcome_Yes" => rand(1.00..20.00), "outcome_No" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.save
                    end
                end
            end
        end
    end

    def basketball_markets(fixture_id_array)
        model_name = "PreMarket"
        fixture_id_array.each do |fixture_id|
            fixture = Fixture.find(fixture_id)
    
            if fixture
                # fixture.update(status: "not_started", start_date: (Date.today + 6.months))
                fixture_id = fixture.id
                event_id = fixture.event_id
    
                [2].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active", name: market_name(mkt, fixture.sport))
                    else
                        attrs["odds"] = {"outcome_Under" => rand(1.00..20.00), "outcome_Over" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.name = market_name(mkt, fixture.sport)
                        mkt_entry.save
                    end
                end
    
                [52, 63].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active", name: market_name(mkt, fixture.sport))
                    else
                        attrs["odds"] = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.name = market_name(mkt, fixture.sport)
                        # mkt_entry.name = market_name(mkt)
                        mkt_entry.save
                    end
                end

                [3].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active", name: market_name(mkt, fixture.sport))
                    else
                        attrs["odds"] = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.name = market_name(mkt, fixture.sport)
                        mkt_entry.save
                    end
                end
            end
        end
    end


    def tennis_markets(fixture_id_array)
        model_name = "PreMarket"
        fixture_id_array.each do |fixture_id|
            fixture = Fixture.find(fixture_id)
    
            if fixture
                fixture_id = fixture.id
                event_id = fixture.event_id
    
                [41, 42].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        attrs["odds"] = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00)}
                        market.update(status: "Active", name: market_name(mkt, fixture.sport), odds: attrs["odds"])
                    else
                        attrs["odds"] = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.name = market_name(mkt, fixture.sport)
                        mkt_entry.save
                    end
                end
    
                [2].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active", name: market_name(mkt, fixture.sport))
                    else
                        attrs["odds"] = {"outcome_Under" => rand(1.00..20.00), "outcome_Over" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.name = market_name(mkt, fixture.sport)
                        mkt_entry.save
                    end
                end
    
                [52].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active", name: market_name(mkt, fixture.sport))
                    else
                        attrs["odds"] = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.name = market_name(mkt, fixture.sport)
                        mkt_entry.save
                    end
                end

                [3].each do |mkt|
                    attrs = {}
                    market = model_name.constantize.find_by(fixture_id: fixture_id, market_identifier: mkt)
                    if market
                        market.update(status: "Active", name: market_name(mkt, fixture.sport))
                    else
                        attrs["odds"] = {"outcome_1" => rand(1.00..20.00), "outcome_2" => rand(1.00..20.00)}
                        mkt_entry = model_name.constantize.new(attrs)
                        mkt_entry.fixture_id = fixture_id
                        mkt_entry.market_identifier = mkt
                        mkt_entry.status = "Active"
                        mkt_entry.name = market_name(mkt, fixture.sport)
                        mkt_entry.save
                    end
                end
            end
        end
    end
end