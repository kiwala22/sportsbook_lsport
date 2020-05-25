class Fixtures::Soccer::PreMatchFixturesController < ApplicationController
  before_action :authenticate_admin!


  layout "admin_application.html.erb"

  def index
    @fixtures = SoccerFixture.where("status IN (?) AND scheduled_time >= ? AND category_id != ? ", ["not_started", "interrupted", "delayed" ], Time.now, "sr:category:1033").order(:scheduled_time).page params[:page]
  end

  def update
    @fixture = SoccerFixture.find(params[:id])
    @fixture.update_attributes(booked: true)
    flash[:notice] = 'Fixture Booked.'
    redirect_to action: "index"
  end
end
