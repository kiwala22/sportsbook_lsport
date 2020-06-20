class BetUsersController < ApplicationController
  before_action :authenticate_admin!


  layout "admin_application.html.erb"

  def index
    @users = User.all.page params[:page]
  end
end
