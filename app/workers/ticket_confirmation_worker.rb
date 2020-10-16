require 'sidekiq'
class TicketConfirmationWorker
  include Sidekiq::Worker
  sidekiq_options queue: "critical"
  sidekiq_options retry: false
  
  def perform(message, routing_key)
    ticket_id = message[:result][:ticketId]
    betslip = BetSlip.find(ticket_id)
    if betslip
      if message[:result][:status] == "accepted"
      
      
      end
      
      if message[:result][:status] == "rejected"
        
        
      end
    end
    
    
  end
end