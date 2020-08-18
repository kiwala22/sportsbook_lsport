class Backend::BetSlipsController < ApplicationController
  before_action :authenticate_admin!

  layout "admin_application.html.erb"

  def index
    @q = BetSlip.all.ransack(params[:q])
    @bet_slips = @q.result.page params[:page]
  end

  def show
    @bet_slip = BetSlip.find(params[:id])
  end
end
