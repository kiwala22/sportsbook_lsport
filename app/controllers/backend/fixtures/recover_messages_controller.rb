class Backend::Fixtures::RecoverMessagesController < ApplicationController
  include Betradar
  before_action :authenticate_admin!

  layout 'admin_application.html.erb'

  def index

    @q = Fixture.where(
          'fixtures.sport_id = ? AND fixtures.status != ? AND fixtures.start_date < ?',
          '6046',
          'finished',
          (Time.now.to_datetime - 3.hours)
        ).joins(:pre_markets).where("pre_markets.market_identifier =? AND pre_markets.status =?", '1',"Active").ransack(params[:q])

    @fixtures =@q.result.order(start_date: :asc).page params[:page]
  end

  def update
    @fixture = Fixture.find(params[:id])
    response_pre = fetch_event_messages('pre', @fixture.fixture_id)
    response_live = fetch_event_messages('live', @fixture.fixture_id)
    if (response_pre == 200 || response_live == 200)
      respond_to do |format|
        flash[:notice] = 'Fixture Recovery Successful.'
        format.js { render layout: false }
      end
    else
      flash[:alert] = 'Oops! Something went wrong'
      redirect_to action: 'index'
    end
  end
end
