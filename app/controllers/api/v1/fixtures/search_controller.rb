class Api::V1::Fixtures::SearchController < ApplicationController
  def index
    results = []
    @fixtures = Fixture.joins(:market1_pre).global_search(params[:search]).where("fixtures.status = ? 
	       		 AND fixtures.start_date <= ? ", "not_started" ,  Time.now).order(start_date: :asc)

    @fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json
      ## Add outcomes to the data
      fixture["outcome_1"] = event.market1_pre.outcome_1
      fixture["outcome_X"] = event.market1_pre.outcome_X
      fixture["outcome_2"] = event.market1_pre.outcome_2
      results.push(fixture)
    end
    
    render json: results
  end
end
