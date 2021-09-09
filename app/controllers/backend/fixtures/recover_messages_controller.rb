class Backend::Fixtures::RecoverMessagesController < ApplicationController
  include Betradar
  before_action :authenticate_admin!

  layout 'admin_application.html.erb'

  def index
    @status = {
      'not_started': '1',
      'live': '2',
      'finished': '3',
      'cancelled': '4',
      'postponed': '5',
      'interrupted': '6',
      'Abandoned': '7',
      'converage lost': '8',
      'about to start': '9'
    }

    @fixtures =
      Fixture
        .joins(:market1_pre)
        .where(
          'fixtures.sport_id = ? AND fixtures.status != ? AND fixtures.start_date < ?',
          '6046',
          'ended',
          (Time.now.to_datetime - 3.hours)
        )
        .order(start_date: :asc).page params[:page]
  end

  def update
    @fixture = Fixture.find(params[:id])
    response_pre = fetch_event_messages('pre', @fixture.fixture_id)
    response_live = fetch_event_messages('liveodds', @fixture.fixture_id)
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
