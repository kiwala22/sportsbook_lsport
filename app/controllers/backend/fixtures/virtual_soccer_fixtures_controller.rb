class Backend::Fixtures::VirtualSoccerFixturesController < ApplicationController
  include Betradar
  before_action :authenticate_admin!


  layout "admin_application.html.erb"

  def index
    
    @q = Fixture.where("sport_id = ? AND league_id IN (?)","6046" ,["37364", "37386", "38301", "37814"] ).ransack(params[:q])
    @fixtures = @q.result.order("start_date DESC").page params[:page]
  end

  def update
    @fixture = Fixture.find(params[:id])
    response = book_live_event(@fixture.fixture_id)
    if response == 200
      @fixture.update(booked: true)
      respond_to do |format|
        flash[:notice] = "Fixture Booked."
        format.js { render :layout => false }
      end
    else
      flash[:alert] = 'Oops! Something went wrong'
      redirect_to action: "index"
    end
  end
end
