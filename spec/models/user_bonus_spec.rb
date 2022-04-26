require 'rails_helper'

RSpec.describe UserBonus, type: :model do
   before do
      #create the bonus and keep it active

      @bonus = TopupBonus.create!(
         {
            multiplier: 20,
            status: "Active",
            expiry: (Date.today + 5.days)
         }
      )


      #sign up new user and check that the balace is zero
      @user = User.create(
         {
            first_name: "first_name",
            last_name: "last name",
            phone_number: "256776582036",
            password: "Pa$$word5",
            password_confirmation: "Pa$$word5",
            balance: 1000
         }
      )

      #create transaction
      @transaction = Transaction.create(
         reference: "Pa$$word5",
         amount: 1000000,
         phone_number: @user.phone_number,
         category: "Deposit",
         status: "COMPLETED",
         currency: "UGX",
         user_id: @user.id
      )
   end

   it "caps the maximum bonus to 100,000" do
      ## Check if there's a first deposit bonus
      if TopupBonus.exists? && TopupBonus.last.status == "Active"
         TopupBonus.fist_deposit_bonus(@user.id, @transaction.id)
      end
      #expect user bonus count to increase by 1
      expect(UserBonus.count).to eq(1)
      #expect user bonus to have amount 200
      expect(@user.user_bonuses.first.amount).to eq(100000.00)
      expect(User.find(@user.id).bonus).to eq(100000)
   end
end
