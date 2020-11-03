require 'sidekiq'
class TicketConfirmWorker
	include Sidekiq::Worker
	sidekiq_options queue: "critical"
	sidekiq_options retry: false
	
	def perform(message, routing_key)
		ticket_id = message["result"]["ticketId"]
		betslip = BetSlip.find(ticket_id)
		user = User.find(betslip.user_id)
		if message["result"]["status"] == "accepted"
			if betslip.bets.select(:product).include?("1")
				time_limit = 16 
			else
				time_limit = 2
			end
			
			if (Time.now.to_i  - betslip.created_at.to_i) <= time_limit
				betslip.update!(status: "Active")
				betslip.bets.update_all(status: "Active")
			else
				#process expired tickets
				betslip.update!(status: "Rejected", reason: "Expired")
				betslip.bets.update_all(status: "Rejected")
				#send a ticket cancellation request
				Mts::SubmitCancel.new.publish(slip_id: betslip.id, code: 102)
				
			end
		elsif message["result"]["status"] == "rejected"
			betslip.update!(status: "Rejected", reason: message["result"]["reason"]["message"]) 
			betslip.bets.update_all(status: "Rejected")
			#refund the stake
			previous_balance = user.balance
			balance_after = user.balance = (user.balance + betslip.stake)
			transaction = user.transactions.build(balance_before: previous_balance, balance_after: balance_after, phone_number: user.phone_number, status: "SUCCESS", currency: "UGX", amount: betslip.stake, category: "Refund" )
			
			BetSlip.transaction do
				user.save!
				transaction.save!
			end
			
		else
			Rails.logger.error("Unknown ticket")
			Rails.logger.error(message)
		end
		
	end
end