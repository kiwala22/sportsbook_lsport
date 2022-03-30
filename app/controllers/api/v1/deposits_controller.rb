class Api::V1::DepositsController < ApplicationController
   before_action :authenticate_user!
   include CurrentCart
   before_action :set_cart
   skip_before_action :verify_authenticity_token

   def create
      ext_reference = generate_reference()
      amount = deposit_params[:amount].to_i
      phone_number = deposit_params[:phone_number]

      #create a deposit transaction
      @transaction = Transaction.create(
         reference: ext_reference,
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

   def generate_reference
      loop do
         reference = SecureRandom.uuid
         break reference = reference unless Transaction.where(reference: reference).exists?
      end
   end

end
