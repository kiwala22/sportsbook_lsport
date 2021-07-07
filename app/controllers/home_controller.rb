class HomeController < ApplicationController
	include CurrentCart
	before_action :set_cart
	
	def index
		##Live games
		@live_q = Fixture.joins(:market1_live).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND market1_lives.status = ?", "live", "6046", ["37364", "37386", "38301", "37814"], "Active").order(start_date: :asc)
		@live_fixtures = @live_q.includes(:market1_live).where("market1_lives.status = ?", "Active").limit(10)

		##All Prematch
		@q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND market1_pres.status = ?", "not_started", "6046", ["37364", "37386", "38301", "37814"], (Time.now), (Date.today.end_of_day + 10.months), "Active").order(start_date: :asc)

		##Featured games
		@check_params = false
		@featured = @q.includes(:market1_pre).where("market1_pres.status = ? AND fixtures.featured = ?", "Active", true).limit(10)

		##PreMatch games
		@pagy, @prematch_fixtures = pagy(@q.includes(:market1_pre).where("market1_pres.status = ?", "Active"))
	end

	def page_refresh
		render :action => :index and return
	 end
end
