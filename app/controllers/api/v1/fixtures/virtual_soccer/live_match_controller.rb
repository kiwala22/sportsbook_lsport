class Api::V1::Fixtures::VirtualSoccer::LiveMatchController < ApplicationController
  def index
    virtual = []
    @q =
    Fixture
    .joins(:live_markets)
    .where(
      'fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id IN (?) AND live_markets.market_identifier = ? AND live_markets.status = ?',
      'live',
      '6046',
      %w[37364 37386 38301 37814],
      '1',
      'Active'
    )
    .order(start_date: :asc)

    @fixtures =
      @q.includes(:live_markets)
      .where('live_markets.status = ? AND live_markets.market_identifier = ?', 'Active', '1')

    @fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json
      market = event.live_markets.where(market_identifier: 1).first
      ## Add outcomes to the data
      fixture["market_#{market.market_identifier}_odds"] = JSON.parse(market.odds)

      ## Add market status to the fixture
      fixture["market_#{market.market_identifier}_status"] = market.status
      
      virtual.push(fixture)
    end
    render json: virtual
  end

  def show
    @fixture =Fixture.includes(:live_markets).find(params[:id])

    ##Required Markets
    markets = [1, 2, 3, 7, 17]

    fixture = @fixture.as_json
    
    ## Add outcomes and market statuses to the fixture
    markets.each do |market_identifier|

      market =  @fixture.live_markets.where(market_identifier: market_identifier).first
      if market
        ## Add outcomes to the data
        fixture["market_#{market_identifier}_odds"] = JSON.parse(market.odds)

        ## Add market status to the fixture
        fixture["market_#{market_identifier}_status"] = market.status
      end
    end

    render json: fixture
  end
end
