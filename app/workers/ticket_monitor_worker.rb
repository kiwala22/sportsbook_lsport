require 'sidekiq'
class TicketMonitorWorker
	include Sidekiq::Worker
	sidekiq_options queue: "critical"
	sidekiq_options retry: false
	
	def perform(ticket_id)
		bet_slip = BetSlip.find(ticket_id)
		user = User.find(bet_slip.user_id)
		#check is the status is still pending, meaning we did not receive the MTS callback
		if bet_slip.status == "Pending"
			#fail the ticket, #refund the money
			bet_slip.update!(status: "Failed", reason: "TimeOut") 
			bet_slip.bets.update_all(status: "Failed")
			#refund the stake
			previous_balance = user.balance
			balance_after = user.balance = (user.balance + bet_slip.stake)
			transaction = user.transactions.build(balance_before: previous_balance, balance_after: balance_after, phone_number: user.phone_number, status: "SUCCESS", currency: "UGX", amount: bet_slip.stake, category: "Refund" )
			
			BetSlip.transaction do
				#call the MTS cancellation
				Mts::SubmitCancel.new.publish(slip_id: bet_slip.id, code: 102)
				user.save!
				transaction.save!
			end
		end
	end
end