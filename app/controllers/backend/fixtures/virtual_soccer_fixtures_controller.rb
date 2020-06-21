class Backend::Fixtures::VirtualSoccerFixturesController < ApplicationController
  include Betradar
  before_action :authenticate_admin!


  layout "admin_application.html.erb"

  def index
    @q = Fixture.where("sport_id = ? AND category_id = ?","sr:sport:1" ,"sr:category:1033" ).ransack(params[:q])
    @fixtures = @q.result.order(:scheduled_time).page params[:page]
  end

  def update
    @fixture = Fixture.find(params[:id])
    response = book_live_event(@fixture.event_id)
    if response == 200
      @fixture.update_attributes(booked: true)
      flash[:notice] = 'Fixture Booked.'
      redirect_to action: "index"
    else
      flash[:alert] = 'Oops! Something went wrong'
      redirect_to action: "index"
    end
  end
end
