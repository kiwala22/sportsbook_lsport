class Backend::Fixtures::RecoverMessagesController < ApplicationController
  include Betradar
  before_action :authenticate_admin!


  layout "admin_application.html.erb"

  def index
    @fixtures = Fixture.joins(:market1_pre).where("fixtures.sport_id = ? AND fixtures.status != ? AND fixtures.scheduled_time < ?","sr:sport:1", "ended", (Time.now.to_datetime - 3.hours)).order(scheduled_time: :asc).page params[:page]
  end

  def update
    @fixture = Fixture.find(params[:id])
    response_pre = fetch_event_messages("pre", @fixture.event_id)
    response_live = fetch_event_messages("liveodds", @fixture.event_id)
    if (response_pre == 200 || response_live == 200)
      respond_to do |format|
        flash[:notice] = "Fixture Recovery Successful."
        format.js { render :layout => false }
      end
    else
      flash[:alert] = 'Oops! Something went wrong'
      redirect_to action: "index"
    end
  end
end
