class Backend::Fixtures::SoccerFixturesController < ApplicationController
  include Betradar
  before_action :authenticate_admin!


  layout "admin_application.html.erb"

  def index

    @q = Fixture.where("sport_id = ? AND league_id NOT IN (?)","6046" ,["37364", "37386", "38301", "37814"]).ransack(params[:q])
    @fixtures = @q.result.order("start_date DESC").page params[:page]
  end

  def update
    @fixture = Fixture.find(params[:id])
    response = book_live_event(@fixture.event_id)
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

  def feature_update
    @fixture = Fixture.find(params[:id])
    action = params[:data]
    if @fixture
      if action == "Add"
        @fixture.update(featured: true)
      elsif action == "Remove"
        @fixture.update(featured: false)
      end
      respond_to do |format|
        flash[:notice] = "Fixture Updated."
        format.html
        format.json
        format.js { render :layout => false }
      end
    end
  end
end
