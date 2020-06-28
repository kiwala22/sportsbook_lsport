class TransactionsController < ApplicationController
  before_action :authenticate_user!

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
      flash.now[:notice] = "Please wait while we process your payment.."
      render :new and return
    else
      flash.now[:alert] = "Something went wrong. Please try again."
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
      flash.now[:alert] = "You have insufficient funds on your account."
      render :transfer and return
    else
      if @transaction.save
        WithdrawsWorker.perform_async(@transaction.id)
        flash.now[:notice] = "Please wait while we process your payment.."
        render :transfer and return
      else
        flash.now[:alert] = "Something went wrong. Please try again."
        render :transfer and return
      end
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
