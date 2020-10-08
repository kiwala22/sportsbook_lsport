require 'sidekiq'
class CompleteAirtelTransactionsWorker
  include Sidekiq::Worker
  sidekiq_options queue: "critical"
  sidekiq_options retry: false


  def perform(transaction_id)
    ##Find the corresponding transaction to the deposit
    @transaction = Transaction.find(transaction_id)

    ##Find the user who made the specific transaction to track balances
    user = User.find(@transaction.user_id)

    balance_before = user.balance

    balance_after = (balance_before + @transaction.amount)

    ##Find the deposit and update the balance after as well
    @deposit = Deposit.find_by(transaction_id: @transaction.id)

    @deposit.update(balance_after: balance_after)

    ##Update the transaction status as completed
    @transaction.update(balance_before: balance_before, balance_after: balance_after, status: "COMPLETED")

    ##Then you can Credit user account with the specified amount
    user.update(balance: balance_after)
  end
end