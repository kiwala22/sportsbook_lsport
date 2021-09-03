class Api::V1::HomeController < ApplicationController
  def index
    ##Complete Game data
    live = []

    ##Live games
    @live_q =
      Fixture
        .joins(:market1_live)
        .where(
          'fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND market1_lives.status = ?',
          'live',
          '6046',
          %w[37364 37386 38301 37814],
          'Active'
        )
        .order(start_date: :asc)
    @live_fixtures =
      @live_q
        .includes(:market1_live)
        .where('market1_lives.status = ?', 'Active')
        .limit(10)
    @live_fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture['outcome_mkt1_1'] = event.market1_live.outcome_1
      fixture['outcome_mkt1_X'] = event.market1_live.outcome_X
      fixture['outcome_mkt1_2'] = event.market1_live.outcome_2

      ## Add market status to the fixture
      fixture["market_mkt1_status"] = event.market1_live.status

      live.push(fixture)
    end

    prematch = []

    ##All Prematch
    @q =
      Fixture
        .joins(:market1_pre)
        .where(
          'fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND market1_pres.status = ?',
          'not_started',
          '6046',
          %w[37364 37386 38301 37814],
          (Time.now),
          (Date.today.end_of_day + 10.months),
          'Active'
        )
        .order(start_date: :asc)

    ##PreMatch games
    @prematch_fixtures =
      @q
        .includes(:market1_pre)
        .where(
          'market1_pres.status = ? AND fixtures.featured = ?',
          'Active',
          false
        )
    @prematch_fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture['outcome_mkt1_1'] = event.market1_pre.outcome_1
      fixture['outcome_mkt1_X'] = event.market1_pre.outcome_X
      fixture['outcome_mkt1_2'] = event.market1_pre.outcome_2

      ## Add market status to the fixture
      fixture["market_mkt1_status"] = event.market1_pre.status

      prematch.push(fixture)
    end

    featured = []

    ##Featured games
    @featured =
      @q
        .includes(:market1_pre)
        .where(
          'market1_pres.status = ? AND fixtures.featured = ?',
          'Active',
          true
        )
        .limit(10)
    @featured.each do |event|
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture['outcome_mkt1_1'] = event.market1_pre.outcome_1
      fixture['outcome_mkt1_X'] = event.market1_pre.outcome_X
      fixture['outcome_mkt1_2'] = event.market1_pre.outcome_2

      ## Add market status to the fixture
      fixture["market_mkt1_status"] = event.market1_pre.status

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
