require 'sidekiq'
class CompleteMtnTransactionsWorker
   include Sidekiq::Worker
   sidekiq_options queue: "critical"
   sidekiq_options retry: false

   require 'mobile_money/mtn_open_api'


   def perform(transaction_id)
      ##Find the corresponding transaction to the deposit
      @transaction = Transaction.find(transaction_id)

      ##Find the user who made the specific transaction to track balances
      user = User.find(@transaction.user_id)

      balance_before = user.balance

      balance_after = (balance_before + @transaction.amount)

      ##Find the deposit and update the balance after as well
      @deposit = Deposit.find_by(transaction_id: transaction_id)

      ##Check the transaction status
      result = MobileMoney::MtnOpenApi.check_collection_status(@transaction.reference)

      if result
         ext_transaction_id = result['financialTransactionId']
         status = result['status']
      end

      if ext_transaction_id && status == "SUCCESSFUL"
         @deposit.update(ext_transaction_id: ext_transaction_id, network: "MTN Uganda", status: "SUCCESS", balance_before: balance_before, balance_after: balance_after)
         @transaction.update(balance_before: balance_before, balance_after: balance_after, status: "COMPLETED")
         user.update(balance: balance_after)

         ## Check if there's a first deposit bonus
         if TopupBonus.exists? && TopupBonus.last.status == "Active"
            TopupBonus.fist_deposit_bonus(user.id, @transaction.id)
         end
      else
         @deposit.update(network: "MTN Uganda", status: "FAILED")
         @transaction.update(status: "FAILED")
      end
   end

   def generate_reference
      loop do
         reference = SecureRandom.uuid
         break reference = reference unless Transaction.where(reference: reference).exists?
      end
   end
end
