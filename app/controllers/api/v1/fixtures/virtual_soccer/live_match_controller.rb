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
      market = event.live_markets.where(market_identifier: 1)
      ## Add outcomes to the data
      fixture["markets"] = market

      ## Add market status to the fixture
      # fixture["market_#{market.market_identifier}_status"] = market.status
      
      virtual.push(fixture)
    end
    render json: virtual
  end

  def show
    @fixture = Fixture.includes(:live_markets).find(params[:id])

    fixture = @fixture.as_json

    ## Add all available markets to fixture data
    markets = @fixture.live_markets.where("market_identifier IN (?) AND status = ?", ["1", "2", "3", "5", "7", "17", "13", "16", "19", "21", "25", "41", "42", "52", "55", "61", "64", "65" "113", "245", "45"], "Active").order('market_identifier::integer ASC, specifier')

    fixture["markets"] = markets

    render json: fixture
      
  end
end
