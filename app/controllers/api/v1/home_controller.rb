class Api::V1::HomeController < ApplicationController

  def live
	##Complete Game data
	live = []
    ##Live games
		@live_q = Fixture.joins(:market1_live).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND market1_lives.status = ?", "live", "6046", ["37364", "37386", "38301", "37814"], "Active").order(start_date: :asc)
		@live_fixtures = @live_q.includes(:market1_live).where("market1_lives.status = ?", "Active").limit(10)
		@live_fixtures.each do |event|
			## convert  fixture to json
			fixture = event.as_json
			## Add outcomes to the data
			fixture["outcome_1"] = event.market1_live.outcome_1
			fixture["outcome_X"] = event.market1_live.outcome_X
			fixture["outcome_2"] = event.market1_live.outcome_2
			live.push(fixture)
		end

    render json: { live: live }, status: 200
  end

  def prematch
	prematch = []
	##All Prematch
	@q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND market1_pres.status = ?", "not_started", "6046", ["37364", "37386", "38301", "37814"], (Time.now), (Date.today.end_of_day + 10.months), "Active").order(start_date: :asc)
		##PreMatch games
		@prematch_fixtures = @q.includes(:market1_pre).where("market1_pres.status = ? AND fixtures.featured = ?", "Active", false)
		@prematch_fixtures.each do |event|
			## convert  fixture to json
			fixture = event.as_json
			## Add outcomes to the data
			fixture["outcome_1"] = event.market1_pre.outcome_1
			fixture["outcome_X"] = event.market1_pre.outcome_X
			fixture["outcome_2"] = event.market1_pre.outcome_2
			prematch.push(fixture)
		end
		render json: { prematch: prematch }, status: 200
  end

  def featured
	featured = []

	##All Prematch
	@q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND market1_pres.status = ?", "not_started", "6046", ["37364", "37386", "38301", "37814"], (Time.now), (Date.today.end_of_day + 10.months), "Active").order(start_date: :asc)

	##Featured games
	@featured = @q.includes(:market1_pre).where("market1_pres.status = ? AND fixtures.featured = ?", "Active", true).limit(10)
	@featured.each do |event|
		## convert  fixture to json
		fixture = event.as_json
		## Add outcomes to the data
		fixture["outcome_1"] = event.market1_pre.outcome_1
		fixture["outcome_X"] = event.market1_pre.outcome_X
		fixture["outcome_2"] = event.market1_pre.outcome_2
		featured.push(fixture)
	end

	render json: { featured: featured }, status: 200

  end

end
