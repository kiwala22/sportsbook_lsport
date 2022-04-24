require 'rails_helper'

RSpec.describe TopupBonus, type: :model do

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
         amount: 1000,
         phone_number: @user.phone_number,
         category: "Deposit",
         status: "PENDING",
         currency: "UGX",
         user_id: @user.id
      )
   end

   #Bonus is active
   it "creates user bonus when the bonus is active" do
      ## Check if there's a first deposit bonus
      if TopupBonus.exists? && TopupBonus.last.status == "Active"
         TopupBonus.fist_deposit_bonus(@user.id, @transaction.id)
      end
      #expect user bonus count to increase by 1
      expect(UserBonus.count).to eq(1)
      #expect user bonus to have amount 200
      expect(@user.user_bonuses.first.amount).to eq(200.00)


   end

   it "creates does not create user bonus when the bonus is inactive" do
      @bonus.update!(status: "Closed")
      sleep(3)
      ## Check if there's a first deposit bonus
      if TopupBonus.exists? && TopupBonus.last.status == "Active"
         TopupBonus.fist_deposit_bonus(@user.id, @transaction.id)
      end
      #expect user bonus count to not increase by 1
      expect(UserBonus.count).to eq(0)



   end

   it "activates the bonus when betspip with stake greater than bonus is made" do
      @bonus.update!(status: "Active")
      ## Check if there's a first deposit bonus
      if TopupBonus.exists? && TopupBonus.last.status == "Active"
         TopupBonus.fist_deposit_bonus(@user.id, @transaction.id)
      end
      #Make a bet slip of amount > 1000
      betslip = @user.bet_slips.create!()
      betslip.update(
         {
            bet_count: 2,
            stake: 1000,
            win_amount: 50000,
            odds: 100,
            status: "Active",
            paid: "False",
            result: "Active",
            bonus: 100,
            user_id: @user.id

         }
      )
      sleep(2)
      #expect bonus to change to closed
      expect(UserBonus.last.status).to eq("Closed")

      #expect balance to become 1200
      expect(User.find(@user.id).balance).to eq(1200)


   end

   it " does not activate the bonus when betspip with stake below than bonus is made" do
      @bonus.update!(status: "Active")
      ## Check if there's a first deposit bonus
      if TopupBonus.exists? && TopupBonus.last.status == "Active"
         TopupBonus.fist_deposit_bonus(@user.id, @transaction.id)
      end

      #Make a bet slip of amount < 1000
      betslip = @user.bet_slips.create!()
      betslip.update(
         {
            bet_count: 2,
            stake: 500,
            win_amount: 50000,
            odds: 100,
            status: "Active",
            paid: "False",
            result: "Active",
            bonus: 100,
            user_id: @user.id

         }
      )
      sleep(2)
      #expect bonus to change to remain active
      expect(@bonus.status).to eq("Active")

      #expect balance to remain 1000
      expect(User.find(@user.id).balance).to eq(1000)

   end
end
