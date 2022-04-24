class BetSlip < ApplicationRecord
   audited
   belongs_to :user
   has_many :bets

   after_create :activate_bonuses

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
      if UserBonus.where(user_id: self.user_id, status: "Active").exists?
         user = User.find(self.user_id)
         bonus = UserBonus.where(user_id: self.user_id, status: "Active").last
         limit = ( bonus.amount / 0.2)
         stakes = user.bet_slips.sum(:stake)
         if stakes >= limit
            balance_before = user.balance
            balance_after = (user.balance + bonus.amount)

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
              user.update!(balance: balance_after,activated_first_deposit_bonus: true, first_deposit_bonus_amount: bonus.amount)
              bonus.update!(status: "Closed", amount: 0.0)
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
