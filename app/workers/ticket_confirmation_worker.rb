require 'sidekiq'
class TicketConfirmationWorker
  include Sidekiq::Worker
  sidekiq_options queue: "critical"
  sidekiq_options retry: false
  
  def perform(message, routing_key)
    ticket_id = message[:result][:ticketId]
    betslip = BetSlip.find(ticket_id)

    if betslip && message[:result][:status] == "accepted"
      if betslip.product == "1"
        time_limit = 2 
      elsif betslip.product == "3"
        time_limit = 16
      end

      if (Time.now.to_i  - betslip.created_at.to_i) <= time_limit
        if betslip.stake.to_f <= betslip.balance.to_f
          balance_before = betslip.user.balance
          balance_after = (betslip.user.balance.to_f - betslip.stake.to_f)
          betslip.user.balance = balance_after
          betslip.status = "Active"
          transaction = betslip.user.transactions.build(balance_before: balance_before, balance_after: balance_after, phone_number: betslip.user.phone_number, status: "SUCCESS", currency: "UGX", amount: betslip.stake, category: "Withdraw" )
          BetSlip.transaction do
            user.save!
            betslip.save!
            transaction.save!
          end
        else
          betslip.update!(status: "Insufficient Balance")
        end
      else
        #process expired tickets
        betslip.update!(status: "Expired")
        #send a ticket cancellation request

      end
    elsif betslip && message[:result][:status] == "rejected"
      betslip.update!(status: "Rejected")    
    else
      Rails.logger.error("Unknown ticket")
      Rails.logger.error(message)
    end


    if betslip 
      if message[:result][:status] == "accepted"

        betslip.status = "Success"

        BetSlip.transaction do
          
        end
      end

     if message[:result][:status] == "accepted" && ((Time.now.to_i  - betslip.create_at.to) > 2)
        betslip.update!(status: "Expired") 
      end
      
      if message[:result][:status] == "rejected"
        betslip.update!(status: "Rejected")    
      end
    end
    
    
  end
end