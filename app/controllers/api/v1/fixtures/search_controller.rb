class Api::V1::Fixtures::SearchController < ApplicationController
  def index
    results = []
    @fixtures =
      Fixture
        .joins(:pre_market)
        .global_search(params[:search])
        .where(
          'fixtures.status = ? 
	       		 AND fixtures.start_date <= ? ',
          'not_started',
          Time.now
        )
        .order(start_date: :asc)

    @fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture["market_#{event.pre_market.market_identifier}_odds"] = event.pre_market.odds

      ## Add market status to the fixture
      fixture["market_#{event.pre_market.market_identifier}_status"] = event.pre_market.status
      
      results.push(fixture)
    end

    render json: results
  end
end
