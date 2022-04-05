class Api::V1::DepositsController < ApplicationController
   before_action :authenticate_user!
   include CurrentCart
   before_action :set_cart
   skip_before_action :verify_authenticity_token

   def create
      amount = deposit_params[:amount].to_i
      phone_number = deposit_params[:phone_number]

      ## Check number network and return corresponding transactionid
      reference = check_network(phone_number) == "MTN" ? mtn_reference() : airtel_reference()

      #create a deposit transaction
      @transaction = Transaction.create(
         reference: reference,
         amount: amount,
         phone_number: phone_number,
         category: "Deposit",
         status: "PENDING",
         currency: "UGX",
         user_id: current_user.id
      )
      if @transaction.persisted?
         DepositsWorker.perform_async(@transaction.id)
         render json: {}, status: 200
      else
         logger.error(@transaction.errors.full_messages)
         render json: { errors: @transaction.errors.full_messages } , status: 400
      end
   end

   private
   def deposit_params
      params.permit(:phone_number, :amount)
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
