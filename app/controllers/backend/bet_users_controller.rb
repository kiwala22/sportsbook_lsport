class Backend::BetUsersController < ApplicationController
  before_action :authenticate_admin!

  layout 'admin_application.html.erb'

  def index
    @users = User.all.order('created_at DESC').page params[:page]
  end

  def show
    @user = User.find(params[:id])
    @transactions = Transaction.where(user_id:@user).order(id: :desc).paginate(page: params[:page], per_page:35)
    @bet_slips = BetSlip.where(user_id:@user).order(id: :desc).paginate(page: params[:page], per_page:35)
    @bets = Bet.where(user_id:@user).order(id: :desc).paginate(page: params[:page], per_page:35)
  end

  ##Methods used by the admin to active and deactivate user account
  def deactivate_account
    user = User.find(params[:id])
    user.update(account_active: false)
    flash[:notice] = 'Account Deactivated.'

    #render :index
    redirect_to backend_users_path
  end

  def activate_account
    user = User.find(params[:id])
    user.update(account_active: true)
    flash[:notice] = 'Account Activated Successfully.'

    #render :index
    redirect_to backend_users_path
  end
end
