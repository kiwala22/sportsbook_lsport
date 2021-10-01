class Api::V1::HomeController < ApplicationController
  def index
    ##Complete Game data
    live = []

    ##Live games
    @live_q =
      Fixture
        .joins(:live_market)
        .where(
          'fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND live_markets.market_identifier = ? AND live_markets.status = ?',
          'live',
          '6046',
          %w[37364 37386 38301 37814],
          '1',
          'Active'
        )
        .order(start_date: :asc)
    @live_fixtures =
      @live_q
        .includes(:live_market)
        .where('live_markets.status = ? AND live_markets.market_identifier', 'Active', '1')
        .limit(10)
    @live_fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture["market_#{event.live_market.market_identifier}_odds"] = event.live_market.odds

      ## Add market status to the fixture
      fixture["market_#{event.live_market.market_identifier}_status"] = event.live_market.status

      live.push(fixture)
    end

    prematch = []

    ##All Prematch
    @q =
      Fixture
        .joins(:pre_market)
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
        .includes(:pre_market)
        .where(
          'pre_markets.status = ? AND pre_markets.market_identifier = ? AND fixtures.featured = ?',
          'Active',
          '1',
          false
        )
    @prematch_fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture["market_#{event.pre_market.market_identifier}_odds"] = event.pre_market.odds

      ## Add market status to the fixture
      fixture["market_#{event.pre_market.market_identifier}_status"] = event.pre_market.status

      prematch.push(fixture)
    end

    featured = []

    ##Featured games
    @featured =
      @q
      .includes(:pre_market)
      .where(
        'pre_markets.status = ? AND pre_markets.market_identifier = ? AND fixtures.featured = ?',
        'Active',
        '1',
        true
      )
        .limit(10)
    @featured.each do |event|
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture["market_#{event.pre_market.market_identifier}_odds"] = event.pre_market.odds

      ## Add market status to the fixture
      fixture["market_#{event.pre_market.market_identifier}_status"] = event.pre_market.status

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
