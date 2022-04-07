class Backend::DepositsController < ApplicationController
  before_action :authenticate_admin!

  layout 'admin_application.html.erb'

  def index
    authorize! :index, :deposit, :message => "You are not authorized to view this page..."
    @q = Deposit.all.ransack(params[:q])
    @deposits = @q.result.order('created_at DESC').page params[:page]
    @search_params = params[:q]
  end
end
