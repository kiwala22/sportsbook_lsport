require 'sidekiq'

class RollbackCancelWorker
    include Sidekiq::Worker
    sidekiq_options queue: "default"
    sidekiq_options retry: false

    def perform(message, sport=nil, event=nil)
        #convert the message from the xml to an easr ruby Hash using active support
        start_time = nil
        end_time = nil
        event = message["rollback_bet_cancel"]["event_id"]
        
        if message["rollback_bet_cancel"].has_key?("end_time")
            end_time = message["rollback_bet_cancel"]["end_time"]
        end
        
        if message["rollback_bet_cancel"].has_key?("start_time")
            start_time = message["rollback_bet_cancel"]["start_time"]
        end
        
        product = message["rollback_bet_cancel"]["product"]
        
        #check if market is an array or Hash
        
        if  message["rollback_bet_cancel"]["market"].is_a?(Array)
            message["rollback_bet_cancel"]["market"].each do |market|
                market_id =  market["id"]
                process_cancel_rollback(event: event, product:product, market: market_id, end_time: end_time, start_time: start_time)
            end
        end

        if  message["rollback_bet_cancel"]["market"].is_a?(Hash)
            market_id =  message["rollback_bet_cancel"]["market"]["id"]
            process_cancel_rollback(event: event, product: product, market: market_id, end_time: end_time, start_time: start_time)
        end
       
    end

    def process_cancel_rollback(event:, product:, market:, end_time:, start_time:)
        #create a dynamic query
        conditions = String.new
        wheres = Array.new
        
        #query by event id
        conditions << "market_id = ?"
        wheres << market
        
        #query by bet type
        conditions << " AND product = ?"
        wheres << product

        #query by start time if existent
        if start_time.present?
            conditions << " AND created_at >= ?"
            wheres << Time.at(start_time.to_i / 1000).to_datetime
        end
        
        #query by start time if existent
        if end_time.present?
            conditions << " AND created_at <= ?"
            wheres << Time.at(end_time.to_i / 1000).to_datetime
        end

        wheres.insert(0, conditions)

        #search and update all the bets
        #fixture
        fixture = Fixture.find_by(event_id: event)
        if fixture
            bets =  fixture.bets.where(wheres )
            #cancel all the bets
            bets.update_all(status: "Active")
        end
    end
    
end
