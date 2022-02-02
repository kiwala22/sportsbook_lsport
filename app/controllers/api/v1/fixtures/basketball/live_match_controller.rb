class Api::V1::Fixtures::Basketball::LiveMatchController < ApplicationController
  
  def index
    @q = Fixture.joins(:live_markets).where(
      'fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND live_markets.status = ? AND live_markets.market_identifier = ?',
      'live',
      '48242',
      %w[37364 37386 38301 37814],
      'Active',
      '52'
    ).order(start_date: :asc)

    lives = []

    @fixtures = @q.includes(:live_markets).where(
      'live_markets.status = ? AND live_markets.market_identifier = ?',
      'Active',
      '52'
    )

    @fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json

      market = event.live_markets.where(market_identifier: 52)

      ## Add outcomes to the data
      fixture["markets"] = market

      lives.push(fixture)
    end
    render json: lives
  end

  def show
    @fixture = Fixture.includes(:live_markets).find(params[:id])

    fixture = @fixture.as_json

    ## Add all available markets to fixture data
    markets = @fixture.live_markets.order('market_identifier::integer ASC')

    fixture["markets"] = markets

    render json: fixture
      
  end
end
