require 'sidekiq' 

class Soccer::BetSettlementWorker
    include Sidekiq::Worker
    sidekiq_options queue: "default"
    sidekiq_options retry: false

    def perform(payload)
        #convert the message from the xml to an easr ruby Hash using active support
        message = Hash.from_xml(payload)
        event_id = message["bet_settlement"]["event_id"]
        product =  message["bet_settlement"]["product"]

        if message["bet_settlement"]["certainity"] == "2"
            message["bet_settlement"]["outcomes"].each do |market|
                #build a query
                bets = Bet.where("event_id = ? AND product = ? AND market_id = ?", event_id, product, market["id"])
                bets.update_all(status: "Voided")
            end
        end
    end
    
end