class Deposit < ApplicationRecord

  belongs_to :user

   #Commented code is just a temporary change as we get fix
   validates :amount, presence: true
   # #validates :network, presence: true
   validates :payment_method, presence: true
   validates :transaction_id, presence: true
   # #validates :ext_transaction_id, presence: true
   validates :resource_id, presence: true
   validates :status, presence: true
   validates :currency, presence: true
   validates :phone_number, presence: true
   validates :phone_number, format: {with: /\A(256)\d{9}\z/}
   validates :transaction_id, uniqueness: true
   #validates :ext_transaction_id, uniqueness: true
   validates :resource_id, uniqueness: true

   after_update :check_first_deposit



   def check_first_deposit
     ##First check if the effected change is on the status attribute and is a SUCCESS
     if saved_change_to_status? && self.status == "SUCCESS"
       ##Check how many deposits have status SUCCESS
       previous_deposits = Deposit.where("user_id = ? AND status = ?", self.user_id, "SUCCESS")
       ##if there is only 1 which is the current one then process the bonus, else means there
       ##other deposits that are SUCCESSFUL
       if previous_deposits.count == 1
         process_first_deposit_bonus(previous_deposits.last.amount.to_f)
       end
     end
   end

   def process_first_deposit_bonus(amount)
     ##Find the user
     user = User.find(self.user_id)

     ##Check if there is any First deposit bonus offer
     if TopupBonus.exists? && TopupBonus.last.status == "Active"
       bonus = TopupBonus.last
       trans_amount = bonus.multiplier.nil? ? bonus.amount.to_f : (bonus.multiplier * amount).to_f
       balance_before = user.balance
       balance_after = (trans_amount + balance_before)
       trans_reference = generate_reference()

       ##First creata a transaction with category "first deposit bonus"
       Transaction.create(reference: trans_reference, amount: trans_amount, phone_number: user.phone_number, category: "First Deposit Bonus", status: "SUCCESS", currency: "UGX", balance_before: balance_before, balance_after: balance_after, user_id: user.id)

       ##Update the user balance with the bonus amount
       user.update(balance: balance_after)
     end
   end

   def generate_reference
     loop do
 			reference = SecureRandom.uuid
 			break reference = reference unless Transaction.where(reference: reference).exists?
 		end
   end
end
