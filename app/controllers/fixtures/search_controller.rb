class Fixtures::SearchController < ApplicationController
	
	  def index
	       @fixtures = Fixture.joins(:market1_pre).global_search(params[:search]).where("fixtures.status = ? 
	       		 AND fixtures.scheduled_time >= ? ", "not_started",  Time.now).order(scheduled_time: :asc)
	  end

end
