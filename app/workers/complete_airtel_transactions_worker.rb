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

    if args["txn_code"] == "DP00800001001" && args["txn_status"] = "TS"
      @deposit.update(ext_transaction_id: args["ext_reference"], network: "Airtel Uganda", status: "SUCCESS", balance_before: balance_before, balance_after: balance_after)
      @transaction.update(balance_before: balance_before, balance_after: balance_after, status: "COMPLETED")

      ## Check if there is a top up bonus in the moment and offer the user a bonus
      if TopUpBonus.exists? && TopUpBonus.last.status == "Active"
        bonus_amount = (TopUpBonus.last.multiplier /  100) * @transaction.amount
        balance_after_bonus = balance_after + bonus_amount.to_i

        ## Create a bonus transaction
        Transaction.create(
          reference: generate_reference(),
          amount: bonus_amount,
          phone_number: @transaction.phone_number,
          category: "Top Up Bonus",
          status: "COMPLETED",
          currency: "UGX",
          user_id: @transaction.user_id,
          balance_before: balance_after,
          balance_after: balance_after_bonus
        )

        ## Then you can Credit user account with the specified amount + bonus
        user.update(balance: balance_after_bonus)
      else
        ## Then you can Credit user account with the specified amount
        user.update(balance: balance_after)
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
