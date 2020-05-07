class SoccerFixturesController < ApplicationController
  before_action :authenticate_admin!


  layout "admin_application.html.erb"

  def index
    @fixtures = SoccerFixture.all.page params[:page]
  end

  def update
    @fixture = SoccerFixture.find(params[:id])
    @fixture.update_attributes(booked: true)
    flash[:notice] = 'Fixture Booked.'
    redirect_to action: "index"
  end
end
