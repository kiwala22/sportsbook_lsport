class Api::V1::HomeController < ApplicationController
  def index
    ##Complete Game data
    live = []

    ##Live games
    @live_q =  Fixture.joins(:live_markets).where(
          'fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND live_markets.market_identifier = ? AND live_markets.status = ?',
          'live',
          '6046',
          %w[37364 37386 38301 37814],
          '1',
          'Active' ).order(start_date: :asc)

    @live_fixtures = @live_q.includes(:live_markets)
        .where('live_markets.status = ? AND live_markets.market_identifier = ?', 'Active', '1').limit(10)
        
    @live_fixtures.each do |event|
      ## Find specific market
      market = event.live_markets.where(market_identifier: 1).first
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture["market_#{market.market_identifier}_odds"] = market.odds

      ## Add market status to the fixture
      fixture["market_#{market.market_identifier}_status"] = market.status

      live.push(fixture)
    end

    prematch = []

    ##All Prematch
    @q =
      Fixture
        .joins(:pre_markets)
        .where(
          'fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND pre_markets.status = ? AND pre_markets.market_identifier = ?',
          'not_started',
          '6046',
          %w[37364 37386 38301 37814],
          (Time.now),
          (Date.today.end_of_day + 10.months),
          'Active',
          '1'
        )
        .order(start_date: :asc)

    ##PreMatch games
    @prematch_fixtures =
      @q
        .includes(:pre_markets)
        .where(
          'pre_markets.status = ? AND pre_markets.market_identifier = ? AND fixtures.featured = ?',
          'Active',
          '1',
          false
        )
    @prematch_fixtures.each do |event|
      ## Find specific market
      market = event.pre_markets.where(market_identifier: 1).first
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture["market_#{market.market_identifier}_odds"] = market.odds

      ## Add market status to the fixture
      fixture["market_#{market.market_identifier}_status"] = market.status

      prematch.push(fixture)
    end

    featured = []

    ##Featured games
    @featured =
      @q
      .includes(:pre_markets)
      .where(
        'pre_markets.status = ? AND pre_markets.market_identifier = ? AND fixtures.featured = ?',
        'Active',
        '1',
        true
      )
        .limit(10)
    @featured.each do |event|
      ## Find specific market
      market = event.pre_markets.where(market_identifier: 1).first

      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture["market_#{market.market_identifier}_odds"] = market.odds

      ## Add market status to the fixture
      fixture["market_#{market.market_identifier}_status"] = market.status

      featured.push(fixture)
    end

    render json: {
             live: live,
             prematch: prematch,
             featured: featured
           },
           status: 200
  end
  
end