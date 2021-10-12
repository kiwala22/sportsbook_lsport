class Api::V1::Fixtures::SearchController < ApplicationController
  def index
    results = []
    @fixtures = Fixture.global_search(params[:search]).where('fixtures.status = ? AND fixtures.start_date >= ? ', 'not_started', Time.now).order(start_date: :asc)

    @fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json
      market = event.pre_markets.where(market_identifier: 1).first
      
      if market
        ## Add outcomes to the data
        fixture["market_#{market.market_identifier}_odds"] = market.odds

        ## Add market status to the fixture
        fixture["market_#{market.market_identifier}_status"] = market.status
      end
      
      results.push(fixture)
    end

    render json: results
  end
end
