class TopupBonus < ApplicationRecord
   audited
   validates :amount, presence: true, unless: :multiplier
   validates :multiplier, presence: true, unless: :amount

   def self.fist_deposit_bonus(user_id, transaction_id)
      BONUS_LIMIT = 500000
      #search for the user
      user = User.find(user_id)
      #search for the transction
      transaction = Transaction.find(transaction_id)

      #sarch for the bonus
      bonus = TopupBonus.where(status: "Active").last

      if user && transction && bonus
         bonus =  ((transaction.amount.to_f) * (bonus.multiplier/100))
         if bonus > BONUS_LIMIT
            bonus = BONUS_LIMIT
         end
         #log the bonus separately
         user_bonus = UserBonus.create!(
            {
               user_id = user_id,
               status = "Active",
               amount = bonus,
            }
         )

      end
   end
end
