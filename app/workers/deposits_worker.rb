require 'sidekiq'
class DepositsWorker
  include Sidekiq::Worker
  sidekiq_options queue: "critical"
  sidekiq_options retry: false

  require 'mobile_money/mtn_open_api'
  require 'mobile_money/airtel_uganda'

  def perform(transaction_id)
    @transaction = Transaction.find(transaction_id)

    ##create a deposit transaction
    resource_id = generate_resource_id()
    @deposit = Deposit.create(transaction_id: transaction_id, resource_id: resource_id, amount: @transaction.amount,
       phone_number: @transaction.phone_number, status: "PENDING", currency: "UGX", payment_method: "Mobile Money", balance_before: balance_before,
     user_id: @transaction.user_id, transaction_reference: @transaction.reference)

    if @transaction && @deposit
      ##Proceed with the Deposit APIs
      case @transaction.phone_number
      when /^(25678|25677|25639)/
        #process MTN transaction
        result = MobileMoney::MtnOpenApi.request_payments(@transaction.amount, @transaction.reference, @transaction.phone_number)
        if result
          if result == '202'
            @deposit.update(network: "MTN Uganda", status: "PENDING")
            sleep(5)
            CompleteMtnTransactionsWorker.perform_async(transaction_id)
          else
            @deposit.update(network: "MTN Uganda", status: "FAILED")
            @transaction.update(status: "FAILED")
          end
        else
          @deposit.update(network: "MTN Uganda", status: "FAILED")
          @transaction.update(status: "FAILED")
        end
      when /^(25675|25670)/
        #process Airtel transaction
        result = MobileMoney::AirtelUganda.request_payments(@transaction.phone_number, @transaction.amount, @transaction.reference)
        if result
          if result[:status] == '200'
            @deposit.update(network: "Airtel Uganda", status: "PENDING")
          else
            @deposit.update(network: "Airtel Uganda", status: "FAILED")
            @transaction.update(status: "FAILED")
          end
        else
          @deposit.update(network: "Airtel Uganda", status: "FAILED")
          @transaction.update(status: "FAILED")
        end
      end
    end
  end

  def generate_resource_id()
    loop do
			resource_id = SecureRandom.uuid
			break resource_id = resource_id unless Deposit.where(resource_id: resource_id).exists?
		end
  end
end
