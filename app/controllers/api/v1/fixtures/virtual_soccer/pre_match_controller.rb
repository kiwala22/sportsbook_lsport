class Api::V1::Fixtures::VirtualSoccer::PreMatchController < ApplicationController
  def index
    virtual = []
    @q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND sport_id = ? AND fixtures.league_id IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND market1_pres.status = ?", "not_started", "6046", ["37364", "37386", "38301", "37814"], Time.now, (Date.today.end_of_day+1.days), "Active").order(start_date: :asc)
      
    @fixtures = @q.includes(:market1_pre).where("market1_pres.status = ?", "Active")

    @fixtures.each do |event|
			## convert  fixture to json
			fixture = event.as_json
			## Add outcomes to the data
			fixture["outcome_1"] = event.market1_pre.outcome_1
			fixture["outcome_X"] = event.market1_pre.outcome_X
			fixture["outcome_2"] = event.market1_pre.outcome_2
			virtual.push(fixture)
		end
    render json: virtual
  end
end
