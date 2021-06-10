class Fixtures::SearchController < ApplicationController
	
	  def index
	  	status ={"not_started": "1", "live": "2"}
	       @fixtures = Fixture.joins(:market1_pre).global_search(params[:search]).where("fixtures.status = ? 
	       		 AND fixtures.start_date >= ? ", status[:"not_started"] ,  Time.now).order(start_date: :asc)
	  end

end
