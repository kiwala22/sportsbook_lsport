class Api::V1::WithdrawsController < ApplicationController
   before_action :authenticate_user!
   include CurrentCart
   before_action :set_cart
   skip_before_action :verify_authenticity_token

   def create
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
            render json: {errors: "You have insufficient funds on your account."}, stauts: 400
         else
            if @transaction.save
               WithdrawsWorker.perform_async(@transaction.id)
               render json: {}, status: 200
            else
               render json: {errors: "Transaction has failed please try again."}, stauts: 400
            end
         end
      else
         render json: {errors: "You need to make a deposit or place a bet before any withdraw."}, status: 400
      end
   end

   private
   def withdraws_params
      params.permit(:phone_number, :amount)
   end

   def generate_reference
      loop do
         reference = SecureRandom.uuid
         break reference = reference unless Transaction.where(reference: reference).exists?
      end
   end
end
