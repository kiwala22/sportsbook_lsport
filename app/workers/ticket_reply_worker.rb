require 'sidekiq'
class TicketReplyWorker
  include Sidekiq::Worker
  sidekiq_options queue: "critical"
  sidekiq_options retry: false
  
  def perform(message, routing_key)
    ticket_id = message["result"]["ticketId"]
    code = message["result"]["reason"]["code"]
    bet_slip_cancel = BetSlipCancel.find_by(bet_slip_id: ticket_id)
    bet_slip = BetSlip.find(ticket_id)
    user = User.find(bet_slip.user_id)
    
    if message["result"]["status"] == "cancelled"
      #log a successfull cancellation log
      bet_slip_cancel.update!(status: "Cancelled")
      
      #cancel the betslip and all the bets on it
      bet_slip.update!(status: "Cancelled", reason: "Expired")
      bet_slip.bets.update_all(status: "Cancelled")
      
      #refund the stake	
      previous_balance = user.balance
      balance_after = user.balance = (user.balance + bet_slip.stake)
      transaction = user.transactions.build(balance_before: previous_balance, balance_after: balance_after, phone_number: user.phone_number, status: "SUCCESS", currency: "UGX", amount: bet_slip.stake, category: "Refund" )
      
      BetSlip.transaction do
        user.save!
        transaction.save!
      end

      if bet_slip_cancel.code == "103"
        #send the cancel acknowledgement
        Mts::SubmitAck.new.publish(slip_id: bet_slip.id, code: code )
      end

    elsif message["result"]["status"] == "not_cancelled"
      #create a cancellation log with failed
      bet_slip_cancel.update!(status: "Not Cancelled", reason: message["result"]["reason"]["message"] )
      if bet_slip_cancel.code == "103"
        #send the cancel acknowledgement
        Mts::SubmitAck.new.publish(slip_id: bet_slip.id, code: code )
      end
    else
      Rails.logger.error("Unknown ticket")
      Rails.logger.error(message)
    end
    
  end
end