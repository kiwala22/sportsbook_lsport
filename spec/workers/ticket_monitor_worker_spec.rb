# To test spec, commend out the MTS Services Lib call in the Ticket Confirm Worker to avoid the error of external calls

require 'rails_helper'
require 'sidekiq/testing'
# Sidekiq::Testing.fake!
require 'faker'
WebMock.disable_net_connect!(allow_localhost: true)

RSpec.describe TicketMonitorWorker, type: :worker do
    

   describe "Betslip Cancels if no response comes in 16s" do
      before(:each) do
         @user = create(:user)
         @fixture = create(:fixture)
         @market = create(:market)
         @outcome = create(:outcome)
         @betslip = create(:bet_slip, bet_count: 2, status: "Pending", odds: 5, potential_win_amount: 5000, stake: 1000, user_id: @user.id)
         @bet_one = create(:bet, fixture_id: @fixture.id, bet_slip_id: @betslip.id, odds: 2.5, user_id: @user.id, market_id: @market.id, outcome_id: @outcome.id, status: "Pending")
         @bet_two = create(:bet, fixture_id: @fixture.id, bet_slip_id: @betslip.id, odds: 2.0, user_id: @user.id, market_id: @market.id, outcome_id: @outcome.id, status: "Pending")
         TicketMonitorWorker.perform_in(16.seconds, @betslip.id)
         sleep 16
         Sidekiq::Worker.drain_all
      end
      #betslip status changes to active
      it "changes betslip status to active" do
         expect(BetSlip.last.status).to eq("Failed")  
      end
      
      #bets turn to active 
      it "changes bets status to active" do
         expect(Bet.find(@bet_one.id).status).to  eq("Failed")
         expect(Bet.find(@bet_two.id).status).to  eq("Failed")
      end
      
      #balance remains the same
      it "does not change the balance" do
         expect(User.find(@user.id).balance).to eq(6000)  
      end
      
   end
   
end