class Backend::BettingStatusesController < ApplicationController
  before_action :authenticate_admin!

  layout 'admin_application.html.erb'

  def index
    @betting_statuses =
      BettingStatus.all.order('created_at DESC').page params[:page]
  end
end
