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
        bonus = TopupBonus.last
        bonus_amount = bonus.multiplier.nil? ? bonus.amount.to_f : ((bonus.multiplier / 100) * amount).to_f
        process_first_deposit_bonus(bonus_amount, user.id)
      end
      # ## Check if there is a top up bonus in the moment and offer the user a bonus
      # if TopupBonus.exists? && TopupBonus.last.status == "Active"
      #   bonus_amount = (TopupBonus.last.multiplier /  100) * @transaction.amount
      #   balance_after_bonus = balance_after + bonus_amount.to_i

      #   ## Create a bonus transaction
      #   Transaction.create(
      #     reference: generate_reference(),
      #     amount: bonus_amount,
      #     phone_number: @transaction.phone_number,
      #     category: "Top Up Bonus",
      #     status: "COMPLETED",
      #     currency: "UGX",
      #     user_id: @transaction.user_id,
      #     balance_before: balance_after,
      #     balance_after: balance_after_bonus
      #   )

      #   ## Then you can Credit user account with the specified amount + bonus
      #   user.update(balance: balance_after_bonus)
      # else
      #   ## Then you can Credit user account with the specified amount
      #   user.update(balance: balance_after)
      # end
    else
      @deposit.update(network: "Airtel Uganda", status: "FAILED")
      @transaction.update(status: "FAILED")
    end
  end

  def process_first_deposit_bonus(amount, user_id)
    previous_deposits = Deposit.where("user_id = ? AND status = ?", user_id, "SUCCESS").count()

    if (previous_deposits == 1)
      user = User.find(user_id)
      balance_before = user.balance
      balance_after = (amount + balance_before)
      trans_reference = generate_reference()

      ## First creata a transaction with category "first deposit bonus"
      Transaction.create(reference: generate_reference(), amount: amount, phone_number: user.phone_number, category: "First Deposit Bonus", status: "SUCCESS", currency: "UGX", balance_before: balance_before, balance_after: balance_after, user_id: user_id)

      ## Update the user balance with the bonus amount
      user.update(balance: balance_after, activated_first_deposit_bonus: true, first_deposit_bonus_amount: amount)
    end
  end

  def generate_reference
    loop do
        reference = SecureRandom.uuid
        break reference = reference unless Transaction.where(reference: reference).exists?
    end
  end
end
