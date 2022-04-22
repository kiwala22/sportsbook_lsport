class Api::V1::WithdrawsController < ApplicationController
   before_action :authenticate_user!
   include CurrentCart
   before_action :set_cart
   skip_before_action :verify_authenticity_token

   def create
      amount = params[:amount].to_i

      # First check whether user has used up their sign up bonus before proceedind
      if ((current_user.activated_signup_bonus? || current_user.activated_first_deposit_bonus?) && (current_user.bet_slips.sum(:stake).to_f < (current_user.signup_bonus_amount.to_f + current_user.first_deposit_bonus_amount.to_f)))
         render json: {errors: "First use Bonus Amount in bets before making a Withdraw."}, status: 400
      else
         ## First check if user has any deposit and bet
         if current_user.deposits.any? # && current_user.bets.any?
            ## Check number network and return corresponding transactionid
            reference = check_network(current_user.phone_number) == "MTN" ? mtn_reference() : airtel_reference()

            # create a withdrawal transaction
            @transaction = Transaction.create(
               reference: reference,
               amount: amount,
               phone_number: current_user.phone_number,
               category: "Withdraw",
               status: "PENDING",
               currency: "UGX",
               user_id: current_user.id
            )
            # Before saving transaction check if requested amount is more than user balance
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
            render json: {errors: "You need to make a Deposit or place a bet before any withdraw."}, status: 400
         end
      end
   end

   private
   def withdraws_params
      params.permit(:amount)
   end

   def mtn_reference
      loop do
         reference = SecureRandom.uuid
         break reference = reference unless Transaction.where(reference: reference).exists?
      end
   end

   def airtel_reference
      loop do
         reference = rand(36**8).to_s(36)
         break reference = reference unless Transaction.where(reference: reference).exists?
      end
   end

   def check_network(phone_number)
      case phone_number
      when /^(25677|25678|25639|25676)/
         return "MTN"
      when /^(25670|25675|25674)/
         return "Airtel"
      else
         return "UNDEFINED"
      end
   end
end
