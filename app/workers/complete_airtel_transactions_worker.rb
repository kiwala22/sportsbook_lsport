require 'sidekiq'
class CompleteAirtelTransactionsWorker
   include Sidekiq::Worker
   sidekiq_options queue: "critical"
   sidekiq_options retry: false


   def perform(args)

      ##Find the corresponding transaction to the deposit
      @transaction = Transaction.find_by(reference: args["transaction_id"])

      ##Find the user who made the specific transaction to track balances
      user = User.find(@transaction.user_id)

      balance_before = user.balance

      balance_after = (balance_before + @transaction.amount)

      ##Find the deposit and update the balance after as well
      @deposit = Deposit.find_by(transaction_id: @transaction.id)

      if args["txn_code"] == "DP008001001" && args["txn_status"] = "TS"
         @deposit.update(ext_transaction_id: args["ext_reference"], network: "Airtel Uganda", status: "SUCCESS", balance_before: balance_before, balance_after: balance_after)
         @transaction.update(balance_before: balance_before, balance_after: balance_after, status: "COMPLETED")
         user.update(balance: balance_after)

         ## Check if there's a first deposit bonus
         if TopupBonus.exists? && TopupBonus.last.status == "Active"
            TopupBonus.fist_deposit_bonus(user.id, @deposit.id)
         end

      else
         @deposit.update(network: "Airtel Uganda", status: "FAILED")
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
