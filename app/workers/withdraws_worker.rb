require 'sidekiq'
class WithdrawsWorker
  include Sidekiq::Worker
  sidekiq_options queue: "critical"
  sidekiq_options retry: false

  require 'mobile_money/mtn_open_api'
  require 'mobile_money/airtel_uganda'

  def perform(transaction_id)
    @transaction = Transaction.find(transaction_id)
    user = User.find(@transaction.user_id)
    balance_before = user.balance

    ##create a withdraw transaction
    resource_id = generate_resource_id()
    @withdraw = Withdraw.create(transaction_id: transaction_id, resource_id: resource_id, amount: @transaction.amount,
       phone_number: @transaction.phone_number, status: "PENDING", currency: "UGX", payment_method: "Mobile Money", balance_before: balance_before,
     user_id: @transaction.user_id, transaction_reference: @transaction.reference)

    if @transaction && @withdraw
      ##Proceed with the withdraw APIs
      case @transaction.phone_number
      when /^(25678|25677|25639)/
        #process MTN transaction
        result = MobileMoney::MtnOpenApi.make_transfer(@transaction.amount, @transaction.reference, @transaction.phone_number)
        if result
          if result == '202'
            balance_after = (balance_before  - @transaction.amount)
            response = MobileMoney::MtnOpenApi.check_transfer_status(@transaction.reference)
            ext_transaction_id = response[:financialTransactionId]
            status = response[:status]
            if ext_transaction_id && status == "SUCCESSFUL"
              @withdraw.update(ext_transaction_id: ext_transaction_id, network: "MTN Uganda", status: "SUCCESS", balance_after: balance_after)
              user.update(balance: balance_after)
              @transaction.update(balance_before: balance_before, balance_after: balance_after, status: "COMPLETED")
            else
              @withdraw.update(network: "MTN Uganda", status: "FAILED")
              @transaction.update(balance_before: balance_before, balance_after: balance_before, status: "FAILED")
            end
          else
            @withdraw.update(network: "MTN Uganda", status: "FAILED")
            @transaction.update(balance_before: balance_before, balance_after: balance_before, status: "FAILED")
          end
        else
          @withdraw.update(network: "MTN Uganda", status: "FAILED")
          @transaction.update(balance_before: balance_before, balance_after: balance_before, status: "FAILED")
        end
      when /^(25675|25670)/
        #process Airtel transaction
        result = MobileMoney::AirtelUganda.make_payments(@transaction.phone_number, @transaction.amount, @transaction.reference)
        if result
          if result[:status] == '200'
            balance_after = (balance_before - @transaction.amount)
            @withdraw.update(ext_transaction_id: result[:ext_transaction_id], network: "Airtel Uganda", status: "SUCCESS", balance_after: balance_after)
            user.update(balance: balance_after)
            @transaction.update(balance_before: balance_before, balance_after: balance_after, status: "COMPLETED")
          else
            @withdraw.update(network: "Airtel Uganda", status: "FAILED")
            @transaction.update(balance_before: balance_before, balance_after: balance_before, status: "FAILED")
          end
        else
          @withdraw.update(network: "Airtel Uganda", status: "FAILED")
          @transaction.update(balance_before: balance_before, balance_after: balance_before, status: "FAILED")
        end
      end
    end
  end

  def generate_resource_id()
    loop do
			resource_id = SecureRandom.uuid
			break resource_id = resource_id unless Withdraw.where(resource_id: resource_id).exists?
		end
  end
end
