class Api::V1::Fixtures::Soccer::PreMatchController < ApplicationController
  
  def index
    # if params[:q].present?
    #   parameters = ["fixtures.status= 'not_started'", "fixtures.sport_id='6046'", "fixtures.league_id NOT IN ('37364', '37386', '38301', '37814')", "market1_pres.status = 'Active'", "fixtures.start_date >= '#{Time.now}'" ]
    #   if params[:q][:league_name].present?
    #   parameters << "fixtures.league_name='#{params[:q][:league_name]}'"
    #   end
    #   if params[:q][:location].present?
    #   parameters << "fixtures.location='#{params[:q][:location]}'"
    #   end
    #   conditions = parameters.join(" AND ")
    #   @q = Fixture.joins(:market1_pre).where(conditions).order(start_date: :asc)
    #  else
    #   @q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND market1_pres.status = ?", "not_started", "6046", ["37364", "37386", "38301", "37814"], (Time.now), (Date.today.end_of_day + 10.months), "Active").order(start_date: :asc)
    #  end

     @q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND market1_pres.status = ?", "not_started", "6046", ["37364", "37386", "38301", "37814"], (Time.now), (Date.today.end_of_day + 10.months), "Active").order(start_date: :asc)

    @fixtures = @q.includes(:market1_pre).where("market1_pres.status = ?", "Active")
    render json: @fixtures
  end

  def show
  end

end
