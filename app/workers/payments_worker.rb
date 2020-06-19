require 'sidekiq'
class PaymentsWorker
  include Sidekiq::Worker
  sidekiq_options queue: "critical"
  sidekiq_options retry: false

  require 'mobile_money/mtn_open_api'
  require 'mobile_money/airtel_uganda'

  def perform(transaction_id)
    @transaction = Transaction.find(transaction_id)
    user = User.find(@transaction.user_id)
    case @transaction.phone_number
    when /^(25678|25677|25639)/
      #process MTN transaction
      result = MobileMoney::MtnOpenApi.request_payments(@transaction.amount, @transaction.reference, @transaction.phone_number)
      if result
        if result == '200'
          user.update(balance: (user.balance + @transaction.amount))
          @transaction.update(status: "COMPLETED")
        else
          @transaction.update(status: "FAILED")
        end
      else
        @transaction.update(status: "FAILED")
      end
    when /^(25675|25670)/
      #process Airtel transaction
      #result = MobileMoney::AirtelUganda.
    end
  end
end
