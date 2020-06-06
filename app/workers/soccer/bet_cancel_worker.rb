require 'sidekiq'


class BetCancelWorker
    include Sidekiq::Worker
    sidekiq_options queue: "default"
    sidekiq_options retry: false

    def perform(payload)
        db = connect_to_database
        #convert the message from the xml to an easr ruby Hash using active support
        start_time = nil
        end_time = nil
        message = Hash.from_xml(payload)

        event = message["bet_cancel"]["event_id"]
        market_id =  message["bet_cancel"]["market"]["id"]
        product = message["bet_cancel"]["product"]
        #extract the cancel start and end time if they are present
        if message["bet_cancel"].has_key?("end_time")
            end_time = message["bet_cancel"]["end_time"]
        end

        if message["bet_cancel"].has_key?("start_time")
            start_time = message["bet_cancel"]["start_time"]
        end

        #create a dynamic query
        conditions = String.new
        wheres = Array.new

        #query by event id
        conditions << "event_id = ?"
        wheres << event

        #query by bet type
        conditions << "product = ?"
        wheres << product

        #query by start time if existent
        if start_time
            conditions << "created_at >= ?"
            wheres << Time.at(start_time.to_i).to_datetime
        end

        #query by start time if existent
        if end_time
            conditions << "created_at <= ?"
            wheres << Time.at(end_time.to_i).to_datetime
        end

        wheres.insert(0, conditions)
        
        bets = db[:bets].where(wheres)
        db.transaction do 
            bets.update_all(status: "Cancelled", updated_at: Time.now)
        end

        db.disconnect

    end
    
end