class Backend::BetUsersController < ApplicationController
  before_action :authenticate_admin!

  layout 'admin_application.html.erb'

  def new
     @user = User.new()
  end

  def create
     @user = User.new(
        {
           first_name: bet_user_params[:first_name],
           last_name: bet_user_params[:last_name],
           phone_number: bet_user_params[:phone_number],
           password: bet_user_params[:password],
           nationality: "Ugandan",
           verified: true

        }
     )

     if @user.valid? && @user.save
        redirect_to @user , notice: "User Successfully Created"
     else
        render :new , error: ""
     end
  end

  def index
    @q = User.all.ransack(params[:q])
    @users = @q.result.order('created_at DESC').page params[:page]
  end

  def show
    @user = User.find(params[:id])
    @transactions = Transaction.where(user_id:@user).order(id: :desc).paginate(page: params[:page], per_page:35)
    @bet_slips = BetSlip.where(user_id:@user).order(id: :desc).paginate(page: params[:page], per_page:35)
    @bets = Bet.where(user_id:@user).order(id: :desc).paginate(page: params[:page], per_page:35)
    #get sum of all stakes last 30 days
    @stake_sum = @user.bet_slips.sum(:stake)
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

  private

  def bet_user_params
     params.require(:user).permit(:first_name, :last_name, :password, :phone_number )
  end
end
