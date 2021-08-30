class TransactionsController < ApplicationController
  before_action :authenticate_user!
  include CurrentCart
  before_action :set_cart

  def index; end

  def deposit
    @transaction = Transaction.new
  end

  def perform_deposit
    ext_reference = generate_reference
    amount = params[:amount].to_i
    phone_number = params[:phone_number]

    #create a deposit transaction
    @transaction =
      Transaction.new(
        reference: ext_reference,
        amount: amount,
        phone_number: phone_number,
        category: 'Deposit',
        status: 'PENDING',
        currency: 'UGX',
        user_id: current_user.id
      )
    if @transaction.save
      DepositsWorker.perform_async(@transaction.id)
      render json: {
               message: 'Please wait while we process your transaction...'
             },
             status: 200
      # redirect_to root_path
      # flash[:notice] = "Please wait while we process your transaction.."
    else
      render json: {
               message: 'Transaction Has failed please try again.'
             },
             status: 400
      # flash[:alert] = "Transaction Has failed please try again."
      # render :new and return
    end
  end

  def withdraw
    @transaction = Transaction.new
  end

  def perform_withdraw
    ext_reference = generate_reference
    amount = params[:amount].to_i
    phone_number = current_user.phone_number

    # First check if user has any deposit and bet
    if current_user.deposits.any?
      # && current_user.bets.any?
      #create a withdrawal transaction
      @transaction =
        Transaction.new(
          reference: ext_reference,
          amount: amount,
          phone_number: phone_number,
          category: 'Withdraw',
          status: 'PENDING',
          currency: 'UGX',
          user_id: current_user.id
        )

      #Before saving transaction check if requested amount is more than user balance
      user_balance = current_user.balance
      if (@transaction.amount > user_balance)
        render json: {
                 message: 'You have insufficient funds on your account.'
               },
               status: 400
        # redirect_to root_path
        # flash[:alert] = "You have insufficient funds on your account."
      else
        if @transaction.save
          WithdrawsWorker.perform_async(@transaction.id)
          render json: {
                   message: 'Please wait while we process your payment...'
                 },
                 status: 200
          # redirect_to root_path
          # flash[:notice] = "Please wait while we process your payment.."
        else
          render json: {
                   message: 'Transaction has failed please try again.'
                 },
                 status: 400
          # flash[:alert] = "Transaction Has failed please try again."
          # render :transfer and return
        end
      end
    else
      render json: {
               message:
                 'You need to make a Deposit or place a bet before any withdraw.'
             },
             status: 400
      # flash[:alert] = "You need to make a Deposit or place a bet before any withdraw."
      # redirect_to root_path
    end
  end

  private

  def generate_reference
    loop do
      reference = SecureRandom.uuid
      break reference = reference unless Transaction.where(reference: reference)
        .exists?
    end
  end

  def transaction_params
    params.require(:transaction).permit(:amount, :phone_number)
  end
end
