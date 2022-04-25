class BetSlip < ApplicationRecord
   audited
   belongs_to :user
   has_many :bets

   after_update :activate_bonuses, if: :saved_change_to_status?

   enum bet_slip_status: {
      "Select One" => "",
      "Active" => "Active",
      "Closed" => "Closed"
   }

   enum bet_slip_result: {
      "Select one" => "",
      "Win" => "Win",
      "Loss" => "Loss"
   }

   def self.close_betslips
      BetslipsWorker.perform_async()
   end


   def activate_bonuses
      if self.status == "Active"
         if UserBonus.where(user_id: self.user_id, status: "Active").exists?
            user = User.find(self.user_id)
            bonus = UserBonus.where(user_id: self.user_id, status: "Active").last
            limit = ( bonus.amount / 0.2)
            stakes = user.bet_slips.sum(:stake)
            if stakes >= limit
               balance_before = user.balance
               balance_after = (user.balance + bonus.amount)
               bonus_balance = (user.bonus - bonus.amount)

               ActiveRecord::Base.transaction do
                 #create a deposit for the user # bonus activation record
                 Transaction.create(
                    { reference: generate_reference(),
                       amount: bonus.amount,
                       phone_number: user.phone_number,
                       category: "First Deposit Bonus",
                       status: "SUCCESS", currency: "UGX",
                       balance_before: balance_before,
                       balance_after: balance_after ,
                       user_id: user.id
                    }
                  )
                 #update the user balance
                 user.update!(balance: balance_after,activated_first_deposit_bonus: true, first_deposit_bonus_amount: bonus.amount, bonus: bonus_balance)
                 bonus.update!(status: "Closed")
               end
            end
         end
      end
   end

   def generate_reference
     loop do
         reference = SecureRandom.uuid
         break reference = reference unless Transaction.where(reference: reference).exists?
     end
   end

end
