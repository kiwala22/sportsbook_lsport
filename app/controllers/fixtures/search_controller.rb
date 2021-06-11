class Fixtures::SearchController < ApplicationController
	
	  def index
	       @fixtures = Fixture.joins(:market1_pre).global_search(params[:search]).where("fixtures.status = ? 
	       		 AND fixtures.start_date >= ? ", "not_started" ,  Time.now).order(start_date: :asc)
	  end

end
