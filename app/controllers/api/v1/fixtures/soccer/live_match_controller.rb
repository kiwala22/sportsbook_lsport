class Api::V1::Fixtures::Soccer::LiveMatchController < ApplicationController


  def index
    @q = Fixture.joins(:market1_live).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND market1_lives.status = ?", "live", "6046", ["37364", "37386", "38301", "37814"], "Active").order(start_date: :asc)
      
    @fixtures = @q.includes(:market1_live).where("market1_lives.status = ?", "Active")
    render json: @fixtures
  end

  def show
  end


end
