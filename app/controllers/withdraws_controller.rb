class WithdrawsController < ApplicationController
  before_action :authenticate_admin!

  layout "admin_application.html.erb"

  def index
    @q = Withdraw.all.ransack(params[:q])
    @withdraws = @q.result.order("created_at DESC").page params[:page]
    @search_params = params[:q]
  end
end