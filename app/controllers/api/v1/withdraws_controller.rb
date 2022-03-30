class Api::V1::WithdrawsController < ApplicationController
   before_action :authenticate_user!
   include CurrentCart
   before_action :set_cart
   skip_before_action :verify_authenticity_token

   def create
      ext_reference = generate_reference()
      amount = params[:amount].to_i

      ##First check if user has any deposit and bet
      if current_user.deposits.any? # && current_user.bets.any?
         #create a withdrawal transaction
         @transaction = Transaction.create(
            reference: ext_reference,
            amount: amount,
            phone_number: current_user.phone_number,
            category: "Withdraw",
            status: "PENDING",
            currency: "UGX",
            user_id: current_user.id
         )
         #Before saving transaction check if requested amount is more than user balance
         user_balance = current_user.balance
         
         if (@transaction.amount.to_i > user_balance.to_i)
            render json: {errors: "You have insufficient funds on your account."}, status: 400
         else
            if @transaction.persisted?
               WithdrawsWorker.perform_async(@transaction.id)
               render json: {}, status: 200
            else
               render json: {errors: "Transaction has failed please try again."}, status: 400
            end
         end
      else
         render json: {errors: "You need to make a deposit or place a bet before any withdraw."}, status: 400
      end
   end

   private
   def withdraws_params
      params.permit(:amount)
   end

   def generate_reference
      loop do
         reference = SecureRandom.uuid
         break reference = reference unless Transaction.where(reference: reference).exists?
      end
   end
end
