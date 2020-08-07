require 'sidekiq'
class BetslipsWorker
   include Sidekiq::Worker
   sidekiq_options queue: "high"
   sidekiq_options retry: false

   def perform()
      BetSlip.where(status: "Active").find_in_batches(batch_size: 100) do |batch|
         batch.each do |slip|
            #check all the bets
            bet_results = slip.bets.pluck(:result)
            #check if slip includes voids

            if bet_results.include?("Loss")
               #mark as a loss and close the betslip
               slip.update(status: "Closed", result: "Loss")

            elsif bet_results.all? {|res| res == "Win"}
               user = User.find(slip.user_id)
               #mark as a win and payout winning and top up balance all under a transaction
               total_odds = slip.bets.pluck(:odds).map(&:to_f).inject(:*).round(2)
               win_amount = (slip.stake * total_odds )
               ActiveRecord::Base.transaction do
                  slip.update(status: "Closed" ,result: "Win", win_amount: win_amount)
                  #update the account balances through transactions under an active record transaction
                  previous_balance = user.balance
                  user.balance = (user.balance + win_amount)
                  user.save!
                  transaction = user.transactions.create!(balance_before: previous_balance, balance_after: user.balance, phone_number: user.phone_number, status: "SUCCESS", currency: "UGX", amount:win_amount, category: "Win - #{slip.id}" )
               end

            elsif bet_results.include?("Void")
               user = User.find(slip.user_id)
               no_void_bet_results = slip.bets.where(result: "Win")
               if no_void_bet_results
                  total_odds = no_void_bet_results.pluck(:odds).map(&:to_f).inject(:*).round(2)
                  win_amount = (slip.stake * total_odds )
                  ActiveRecord::Base.transaction do
                     slip.update(status: "Closed" ,result: "Win", win_amount: win_amount)
                     #update the account balances through transactions under an active record transaction
                     previous_balance = user.balance
                     user.balance = (user.balance + win_amount)
                     user.save!
				             transaction = user.transactions.create!(balance_before: previous_balance, balance_after: user.balance, phone_number: user.phone_number, status: "SUCCESS", currency: "UGX", amount:win_amount, category: "Win - #{slip.id}" )
                  end

               else
                  user = User.find(slip.user_id)
                  #refund the stake
                  ActiveRecord::Base.transaction do
                     slip.update(status: "Closed" ,result: "Void", win_amount: slip.stake)
                     #update the account balances through transactions under an active record transaction
                     previous_balance = user.balance
                     user.balance = (user.balance + slip.stake)
				             transaction = user.transactions.create!(balance_before: previous_balance, balance_after: user.balance, phone_number: user.phone_number, status: "SUCCESS", currency: "UGX", amount: slip.stake, category: "Refund" )
                  end

               end

            end

         end

      end
   end

end
