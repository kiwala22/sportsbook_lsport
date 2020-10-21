require 'rails_helper'
require 'sidekiq/testing'
# Sidekiq::Testing.fake!
require 'faker'
WebMock.disable_net_connect!

RSpec.describe TicketConfirmWorker, type: :worker do
    
   #if accepted and on time
   describe "Betslip accepted and on time" do
      before(:each) do
         @user = create(:user)
         @fixture = create(:fixture)
         @market = create(:market)
         @outcome = create(:outcome)
         @betslip = create(:bet_slip, bet_count: 2, status: "Pending", odds: 5, potential_win_amount: 5000, stake: 1000, user_id: @user.id)
         @bet_one = create(:bet, fixture_id: @fixture.id, bet_slip_id: @betslip.id, odds: 2.5, user_id: @user.id, market_id: @market.id, outcome_id: @outcome.id, status: "Pending")
         @bet_two = create(:bet, fixture_id: @fixture.id, bet_slip_id: @betslip.id, odds: 2.0, user_id: @user.id, market_id: @market.id, outcome_id: @outcome.id, status: "Pending")
         routing_key = "node202.ticket.confirm"
         message = {"result"=>{"ticketId"=> @betslip.id, "status"=>"accepted", "reason"=>{"code"=>1024, "message"=>"Ticket accepted"}, "betDetails"=>[]}, "version"=>"2.3", "signature"=>"Itzm0J3l4PmfGL+BfKE0Q2EF8wpu4A1ha56jYVkuZfU=", "exchangeRate"=>44101068}
         #run the worker and drain it
         TicketConfirmWorker.perform_async( message, routing_key)
         Sidekiq::Worker.drain_all
      end
      #betslip status changes to active
      it "changes betslip status to active" do
         expect(BetSlip.last.status).to eq("Active")  
      end
      
      #bets turn to active 
      it "changes bets status to active" do
         expect(Bet.find(@bet_one.id).status).to  eq("Active")
         expect(Bet.find(@bet_two.id).status).to  eq("Active")
      end
      
      #balance remains the same
      it "does not change the balance" do
         expect(User.find(@user.id).balance).to eq(5000)  
      end
      
   end
   
   #If rejected
   #before have a fake accepted confirmation with details of an existing fixture
   
   #betslip turns to rejected
   #balance increases as a refund
   #new transaction is created for the refund
   #bets all become rejected
   #cancel method is called
   describe "Betslip Rejected" do
      before(:each) do
         @user = create(:user)
         @fixture = create(:fixture)
         @market = create(:market)
         @outcome = create(:outcome)
         @betslip = create(:bet_slip, bet_count: 2, status: "Pending", odds: 5, potential_win_amount: 5000, stake: 1000, user_id: @user.id)
         @bet_one = create(:bet, fixture_id: @fixture.id, bet_slip_id: @betslip.id, odds: 2.5, user_id: @user.id, market_id: @market.id, outcome_id: @outcome.id, status: "Pending")
         @bet_two = create(:bet, fixture_id: @fixture.id, bet_slip_id: @betslip.id, odds: 2.0, user_id: @user.id, market_id: @market.id, outcome_id: @outcome.id, status: "Pending")
         routing_key = "node202.ticket.confirm"
         message = {"result"=>{"ticketId"=> @betslip.id, "status"=>"rejected", "reason"=>{"code"=>1024, "message"=>"Ticket accepted"}, "betDetails"=>[]}, "version"=>"2.3", "signature"=>"Itzm0J3l4PmfGL+BfKE0Q2EF8wpu4A1ha56jYVkuZfU=", "exchangeRate"=>44101068}
         #run the worker and drain it
         TicketConfirmWorker.perform_async( message, routing_key)
         Sidekiq::Worker.drain_all
      end
      #betslip status changes to active
      it "changes betslip status to active" do
         expect(BetSlip.last.status).to eq("Rejected")  
      end
      
      #bets turn to active 
      it "changes bets status to active" do
         expect(Bet.find(@bet_one.id).status).to  eq("Rejected")
         expect(Bet.find(@bet_two.id).status).to  eq("Rejected")
      end
      
      #balance remains the same
      it "does not change the balance" do
         expect(User.find(@user.id).balance).to eq(6000)  
      end
      
   end
   
   #if accepted but expired
   #before have a fake accepted confirmation with details of an existing fixture
   
   #betslip turns to expired
   #balance increases as a refund
   #new transaction is created for the refund
   #bets all become rejected
   #cancel method is called 
   describe "Betslip Expired" do
      before(:each) do
         @user = create(:user)
         @fixture = create(:fixture)
         @market = create(:market)
         @outcome = create(:outcome)
         @betslip = create(:bet_slip, bet_count: 2, status: "Pending", odds: 5, potential_win_amount: 5000, stake: 1000, user_id: @user.id, created_at: (Time.now - 5.minutes))
         @bet_one = create(:bet, fixture_id: @fixture.id, bet_slip_id: @betslip.id, odds: 2.5, user_id: @user.id, market_id: @market.id, outcome_id: @outcome.id, status: "Pending")
         @bet_two = create(:bet, fixture_id: @fixture.id, bet_slip_id: @betslip.id, odds: 2.0, user_id: @user.id, market_id: @market.id, outcome_id: @outcome.id, status: "Pending")
         routing_key = "node202.ticket.confirm"
         message = {"result"=>{"ticketId"=> @betslip.id, "status"=>"accepted", "reason"=>{"code"=>1024, "message"=>"Ticket accepted"}, "betDetails"=>[]}, "version"=>"2.3", "signature"=>"Itzm0J3l4PmfGL+BfKE0Q2EF8wpu4A1ha56jYVkuZfU=", "exchangeRate"=>44101068}
         #run the worker and drain it
         TicketConfirmWorker.perform_async( message, routing_key)
         Sidekiq::Worker.drain_all
      end
      #betslip status changes to active
      it "changes betslip status to active" do
         expect(BetSlip.last.status).to eq("Rejected") 
      end
      
      #bets turn to active 
      it "changes bets status to active" do
         expect(Bet.find(@bet_one.id).status).to  eq("Rejected")
         expect(Bet.find(@bet_two.id).status).to  eq("Rejected")
      end
      
      #balance remains the same
      it "does not change the balance" do
         expect(User.find(@user.id).balance).to eq(6000)  
      end
      
   end
   
end