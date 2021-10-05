class Api::V1::Fixtures::VirtualSoccer::PreMatchController < ApplicationController
  def index
    virtual = []
    @q =
    Fixture
      .joins(:pre_markets)
      .where(
        'fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND pre_markets.status = ? AND pre_markets.market_identifier = ?',
        'not_started',
        '6046',
        %w[37364 37386 38301 37814],
        (Time.now),
        (Date.today.end_of_day + 10.months),
        'Active',
        '1'
      ).order(start_date: :asc)

   @fixtures = @q.includes(:pre_markets).where('pre_markets.status = ? AND pre_markets.market_identifier = ?',
      'Active', '1' )

    @fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json
      market = event.pre_markets.where(market_identifier: 1).first

      ## Add outcomes to the data
      fixture["market_#{market.market_identifier}_odds"] = market.odds

      ## Add market status to the fixture
      fixture["market_#{market.market_identifier}_status"] = market.status

      virtual.push(fixture)
    end
    render json: virtual
  end

  def show
    @fixture =Fixture.includes(:pre_markets).find(params[:id])

    ##Required Markets
    markets = [1, 2, 3, 7, 17]

    fixture = @fixture.as_json
    
    ## Add outcomes and market statuses to the fixture
    markets.each do |market_identifier|
      ## Add outcomes to the data
      market = @fixture.pre_markets.where(market_identifier: market_identifier).first
      fixture["market_#{market_identifier}_odds"] = market.odds

      ## Add market status to the fixture
      fixture["market_#{market_identifier}_status"] = market.status
    end

    render json: fixture
      
  end
end
