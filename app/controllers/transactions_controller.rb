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
      PaymentsWorker.perform_async(@transaction.id)
      flash.now[:notice] = "Please wait while we process your payment.."
      render :new and return
    else
      flash.now[:alert] = "Something went wrong. Please try again."
      render :new and return
    end
  end


  private

  def generate_reference
    loop do
			reference = SecureRandom.hex(10)
			break reference = reference unless Transaction.where(reference: reference).exists?
		end
  end

  def transaction_params
    params.require(:transaction).permit(:amount, :phone_number)
  end
end
