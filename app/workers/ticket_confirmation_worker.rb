require 'sidekiq'
class TicketConfirmationWorker
	include Sidekiq::Worker
	sidekiq_options queue: "critical"
	sidekiq_options retry: false
	
	def perform(message, routing_key)
		ticket_id = message[:result][:ticketId]
		betslip = BetSlip.find(ticket_id)
		user = User.find(betslip.user_id)
		if message[:result][:status] == "accepted"
			if betslip.product == "1"
				time_limit = 2 
			elsif betslip.product == "3"
				time_limit = 16
			end
			
			if (Time.now.to_i  - betslip.created_at.to_i) <= time_limit
				betslip.update!(status: "Active")
				betslip.bets.update_all(status: "Active")
			else
				#process expired tickets
				betslip.update!(status: "Expired")
				betslip.bets.update_all(status: "Expired")
				#send a ticket cancellation request
				Mts::SubmitCancel.new.publish(betslip.id)
				
				#refund the stake	
				previous_balance = user.balance
				balance_after = user.balance = (user.balance + stake)
				transaction = user.transactions.build(balance_before: previous_balance, balance_after: balance_after, phone_number: user.phone_number, status: "SUCCESS", currency: "UGX", amount: stake, category: "Deposit" )
				
				BetSlip.transaction do
					user.save!
					transaction.save!
				end
			end
		elsif message[:result][:status] == "rejected"
			betslip.update!(status: "Rejected") 
			betslip.bets.update_all(status: "Rejected")
			#refund the stake
			previous_balance = user.balance
			balance_after = user.balance = (user.balance + stake)
			transaction = user.transactions.build(balance_before: previous_balance, balance_after: balance_after, phone_number: user.phone_number, status: "SUCCESS", currency: "UGX", amount: stake, category: "Deposit" )
			
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