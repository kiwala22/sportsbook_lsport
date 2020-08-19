class Backend::BetsController < ApplicationController
  before_action :authenticate_admin!

  layout "admin_application.html.erb"

  def index
    @q = Bet.all.ransack(params[:q])
    @bets = @q.result.page params[:page]
  end
end
