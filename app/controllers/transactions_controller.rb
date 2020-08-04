class TransactionsController < ApplicationController
  before_action :authenticate_user!

  def index
    @transactions = current_user.transactions.all.order("created_at DESC").page params[:page]
  end

  def new
    @transaction = Transaction.new()
  end

  def deposit
    ext_reference = generate_reference()
    amount = params[:amount].to_i
    phone_number = params[:phone_number]

    #create a deposit transaction
    @transaction = Transaction.new(
      reference: ext_reference,
      amount: amount,
      phone_number: phone_number,
      category: "Deposit",
      status: "PENDING",
      currency: "UGX",
      user_id: current_user.id
    )
    if @transaction.save
      DepositsWorker.perform_async(@transaction.id)
      redirect_to root_path
      flash[:notice] = "Please wait while we process your transaction.."
    else
      flash[:alert] = @transaction.errors.full_messages.first
      render :new and return
    end
  end


  def transfer
    @transaction = Transaction.new()
  end

  def withdraw
    ext_reference = generate_reference()
    amount = params[:amount].to_i
    phone_number = params[:phone_number]

    ##First check if user has any deposit and bet
    if current_user.deposits.any? # && current_user.bets.any?
      #create a withdrawal transaction
      @transaction = Transaction.new(
        reference: ext_reference,
        amount: amount,
        phone_number: phone_number,
        category: "Withdraw",
        status: "PENDING",
        currency: "UGX",
        user_id: current_user.id
      )
      #Before saving transaction check if requested amount is more than user balance
      user_balance = current_user.balance
      if (@transaction.amount > user_balance)
        redirect_to root_path
        flash[:alert] = "You have insufficient funds on your account."
      else
        if @transaction.save
          WithdrawsWorker.perform_async(@transaction.id)
          redirect_to root_path
          flash[:notice] = "Please wait while we process your payment.."
        else
          flash[:alert] = @transaction.errors.full_messages.first
          render :transfer and return
        end
      end
    else
      flash[:alert] = "You need to make a Deposit or place a bet before any withdraw."
      redirect_to root_path
    end
  end


  private

  def generate_reference
    loop do
			reference = SecureRandom.uuid
			break reference = reference unless Transaction.where(reference: reference).exists?
		end
  end

  def transaction_params
    params.require(:transaction).permit(:amount, :phone_number)
  end
end
