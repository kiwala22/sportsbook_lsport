class Backend::BettingStatusesController < ApplicationController
  before_action :authenticate_admin!


  layout "admin_application.html.erb"

  def index
    @betting_statuses = BettingStatus.all.page params[:page]
  end
end
