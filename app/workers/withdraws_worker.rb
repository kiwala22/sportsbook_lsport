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
    @withdraw = Withdraw.create(transaction_id: @transaction.reference, resource_id: resource_id, amount: @transaction.amount,
       phone_number: @transaction.phone_number, status: "PENDING", currency: "UGX", payment_method: "Mobile Money", balance_before: balance_before,
     user_id: @transaction.user_id)

    if @transaction && @withdraw
      ##Proceed with the withdraw APIs
      case @transaction.phone_number
      when /^(25678|25677|25639|25676)/
        #process MTN transaction
        result = MobileMoney::MtnOpenApi.make_transfer(@transaction.amount, @transaction.reference, @transaction.phone_number)
        if result
          if result == '202'
            sleep(30)
            balance_after = (balance_before  - @transaction.amount)
            ext_transaction_id = MobileMoney::MtnOpenApi.check_transfer_status(@transaction.reference)['financialTransactionId']
            @withdraw.update(ext_transaction_id: ext_transaction_id, network: "MTN Uganda", status: "SUCCESS", balance_after: balance_after)
            user.update(balance: balance_after)
            @transaction.update(balance_before: balance_before, balance_after: balance_after, status: "COMPLETED")
          else
            @withdraw.update(network: "MTN Uganda", status: "FAILED")
            @transaction.update(status: "FAILED")
          end
        else
          @withdraw.update(network: "MTN Uganda", status: "FAILED")
          @transaction.update(status: "FAILED")
        end
      when /^(25675|25670|25674)/
        #process Airtel transaction
        result = MobileMoney::AirtelOpenApi.make_payments(@transaction.amount, @transaction.reference, @transaction.phone_number)

        if result
          if result['status']['response_code'] == 'DP00900001001' && result['status']['success'] == true #check transaction and process withdrawals
            balance_after = (balance_before - @transaction.amount)
            @withdraw.update(ext_transaction_id: result['data']['transaction']['reference_id'], network: "Airtel Uganda", status: "SUCCESS", balance_after: balance_after)
            user.update(balance: balance_after)
            @transaction.update(balance_before: balance_before, balance_after: balance_after, status: "COMPLETED")
          else
            @withdraw.update(network: "Airtel Uganda", status: "FAILED")
            @transaction.update(status: "FAILED")
          end
        else
          @withdraw.update(network: "Airtel Uganda", status: "FAILED")
          @transaction.update(status: "FAILED")
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
