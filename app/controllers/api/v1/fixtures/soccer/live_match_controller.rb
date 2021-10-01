class Api::V1::Fixtures::Soccer::LiveMatchController < ApplicationController
  def index
    @lives = []
    @q =
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

    @fixtures =
      @q.includes(:live_market)
      .where('live_markets.status = ? AND live_markets.market_identifier', 'Active', '1')

    @fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture["market_#{event.live_market.market_identifier}_odds"] = event.live_market.odds

      ## Add market status to the fixture
      fixture["market_#{event.live_market.market_identifier}_status"] = event.live_market.status
      
      @lives.push(fixture)
    end
    render json: @lives
  end

  def show
    @fixture =Fixture.includes(:live_market).find(params[:id])

    ##Required Markets
    markets = [1, 2, 3, 7, 17]

    fixture = @fixture.as_json
    
    ## Add outcomes and market statuses to the fixture
    markets.each do |market_identifier|
      ## Add outcomes to the data
      fixture["market_#{market_identifier}_odds"] = @fixture.live_market.where(market_identifier: market_identifier).odds

      ## Add market status to the fixture
      fixture["market_#{market_identifier}_status"] = @fixture.live_market.where(market_identifier: market_identifier).status
    end

    render json: fixture
  end
end
