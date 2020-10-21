require 'sidekiq'
class TicketReplyWorker
  include Sidekiq::Worker
  sidekiq_options queue: "critical"
  sidekiq_options retry: false
  
  def perform(message, routing_key)
    ticket_id = message["result"]["ticketId"]
    bet_slip_cancel = BetSlipCancel.find_by(bet_slip_id: ticket_id)
    
    if message["result"]["status"] == "cancelled"
      #log a successfull cancellation log
      bet_slip_cancel.update!(status: "Cancelled")
		elsif message["result"]["status"] == "not_cancelled"
			#create a cancellation log with failed
			bet_slip_cancel.update!(status: "Not Cancelled", reason: message["result"]["reason"]["message"] )
		else
			Rails.logger.error("Unknown ticket")
			Rails.logger.error(message)
		end

  end
end