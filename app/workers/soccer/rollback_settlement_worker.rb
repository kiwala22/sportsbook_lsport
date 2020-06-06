require 'sidekiq'

class RollbackSettlementWorker
    include Sidekiq::Worker
    sidekiq_options queue: "default"
    sidekiq_options retry: false

    def perform(payload)
        #convert the message from the xml to an easr ruby Hash using active support
        message = Hash.from_xml(payload)
        event_id = message["rollback_ bet_settlement"]["event_id"]
        product =  message["rollback_ bet_settlement"]["product"]

        message["rollback_bet_settlement"].each do |market|
            #build a query
            bets = Bet.where("event_id = ? AND product = ? AND market_id = ?", event_id, product, market["id"])
            bets.update_all(status: "Active")
        end
    end
    
end