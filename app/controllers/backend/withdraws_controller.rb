class Backend::WithdrawsController < ApplicationController
  before_action :authenticate_admin!

  layout 'admin_application.html.erb'

  def index
    authorize! :index, :withdraw, :message => "You are not authorized to view this page..."
    @q = Withdraw.all.ransack(params[:q])
    @withdraws = @q.result.order('created_at DESC').page params[:page]
    @search_params = params[:q]
  end
end
