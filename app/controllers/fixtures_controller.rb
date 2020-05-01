class FixturesController < ApplicationController
  before_action :authenticate_admin!


  layout "admin_application.html.erb"

  def index
    @fixtures = Fixture.all.page params[:page]
  end

  def update
    @fixture = Fixture.find(params[:id])
    @fixture.update_attributes(booked: true)
    flash[:notice] = 'Fixture Booked.'
    redirect_to action: "index"
  end
end
