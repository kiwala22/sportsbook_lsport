require 'rails_helper'
require 'sidekiq/testing'
# Sidekiq::Testing.fake!
require 'faker'
WebMock.disable_net_connect!

RSpec.describe TicketReplyWorker, type: :worker do
   #if cancelled
   describe "Cancel Request accepted" do
      before(:each) do
         @user = create(:user)
         @fixture = create(:fixture)
         @market = create(:market)
         @outcome = create(:outcome)
         @betslip = create(:bet_slip, bet_count: 2, status: "Rejected", odds: 5, potential_win_amount: 5000, stake: 1000, user_id: @user.id)
         @bet_one = create(:bet, fixture_id: @fixture.id, bet_slip_id: @betslip.id, odds: 2.5, user_id: @user.id, market_id: @market.id, outcome_id: @outcome.id, status: "Rejected")
         @bet_two = create(:bet, fixture_id: @fixture.id, bet_slip_id: @betslip.id, odds: 2.0, user_id: @user.id, market_id: @market.id, outcome_id: @outcome.id, status: "Rejected")
         @bet_slip_cancel = create(:bet_slip_cancel, bet_slip_id: @betslip.id)
         
         routing_key = "node202.ticket.reply"
         message = {
            "result" => {
                "ticketId" => @betslip.id,
                "status" => "cancelled",
                "reason" => {
                  "code" => 1024,
                  "message" => "Ticket Cancellation accepted"
                }
              },
              "signature" => "BFJK6a0L11KSK9OHK9kTcHhXKFEWpYmj23OTYC8cO88=",
              "version" => "2.3"
            }
         #run the worker and drain it
         TicketReplyWorker.perform_async( message, routing_key)
         Sidekiq::Worker.drain_all
      end
      #betslip cancel status changes to cancelled
      it "changes betslip cancel status to cancelled" do
         expect(BetSlipCancel.last.status).to eq("Cancelled")  
      end
   end

   describe "Cancel Request not accepted" do
      before(:each) do
         @user = create(:user)
         @fixture = create(:fixture)
         @market = create(:market)
         @outcome = create(:outcome)
         @betslip = create(:bet_slip, bet_count: 2, status: "Rejected", odds: 5, potential_win_amount: 5000, stake: 1000, user_id: @user.id)
         @bet_one = create(:bet, fixture_id: @fixture.id, bet_slip_id: @betslip.id, odds: 2.5, user_id: @user.id, market_id: @market.id, outcome_id: @outcome.id, status: "RRejected")
         @bet_two = create(:bet, fixture_id: @fixture.id, bet_slip_id: @betslip.id, odds: 2.0, user_id: @user.id, market_id: @market.id, outcome_id: @outcome.id, status: "RRejected")
         @bet_slip_cancel = create(:bet_slip_cancel, bet_slip_id: @betslip.id)
         
         routing_key = "node202.ticket.reply"
         message = {
            "result" => {
                "ticketId" => @betslip.id,
                "status" => "not_cancelled",
                "reason" => {
                  "code" => -2010,
                  "message" => "Ticket not found"
                }
              },
              "signature" => "997XLEFQYBKyhzTK7NQRc6JyH4AsVZXrQw5oP3TOSXY=",
              "version" => "2.3"
            }
            
         #run the worker and drain it
         TicketReplyWorker.perform_async( message, routing_key)
         Sidekiq::Worker.drain_all
      end
      #betslip cancel status changes to cancelled
      it "changes betslip cancel status to not cancelled" do
         expect(BetSlipCancel.last.status).to eq("Not Cancelled")  
      end

      it "updated betslip cancel reason to ticket not found" do
         expect(BetSlipCancel.last.reason).to eq("Ticket not found")  
      end
   end
end