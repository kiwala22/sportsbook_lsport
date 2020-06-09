class Fixtures::Soccer::VirtualFixturesController < ApplicationController
  include Betradar
  before_action :authenticate_admin!
 
 
   layout "admin_application.html.erb"
 
   def index
     @fixtures = SoccerFixture.where("status IN (?) AND scheduled_time >= ? AND category_id = ? ", ["not_started", "live", "interrupted", "delayed" ], Time.now, "sr:category:1033").order(:scheduled_time).page params[:page]
   end
 
   def update
    @fixture = SoccerFixture.find(params[:id])
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
 