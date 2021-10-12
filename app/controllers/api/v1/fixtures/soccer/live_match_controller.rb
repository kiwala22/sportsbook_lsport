class Api::V1::Fixtures::Soccer::LiveMatchController < ApplicationController
  def index
    @lives = []
    @q = Fixture.joins(:live_markets).where(
      'fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND live_markets.market_identifier = ? AND live_markets.status = ?',
      'live',
      '6046',
      %w[37364 37386 38301 37814],
      '1',
      'Active'
    ).order(start_date: :asc)

    @fixtures =
      @q.includes(:live_markets)
      .where('live_markets.status = ? AND live_markets.market_identifier =?', 'Active', '1')

    @fixtures.each do |event|
      ## convert  fixture to json
      market = event.live_markets.where(market_identifier: 1).first
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture["market_#{market.market_identifier}_odds"] = market.odds

      ## Add market status to the fixture
      fixture["market_#{market.market_identifier}_status"] = market.status

      @lives.push(fixture)
    end
    render json: @lives
  end

  def show
    @fixture =Fixture.includes(:live_markets).find(params[:id])

    ##Required Markets
    markets = [1, 2, 3, 7, 17]

    fixture = @fixture.as_json
    
    ## Add outcomes and market statuses to the fixture
    markets.each do |market_identifier|
      
      market = @fixture.live_markets.where(market_identifier: market_identifier).first
      if market
        ## Add outcomes to the data
        fixture["market_#{market_identifier}_odds"] = market.odds

        ## Add market status to the fixture
        fixture["market_#{market_identifier}_status"] = market.status
      end
    end

    render json: fixture
  end
end
