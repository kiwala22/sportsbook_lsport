require 'sidekiq'

class BetStopWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical"
    sidekiq_options retry: false

    def perform(payload)
        db = connect_to_database
        #convert the message from the xml to an easr ruby Hash using active support
        message = Hash.from_xml(payload)
        event_id = message["bet_stop"]["event_id"]
        product =  message["bet_stop"]["product"]

        fixtures = db[:soccer_fixtures].where(event_id: event_id, status: "Active")
        if fixtures
            db.transaction do
                fixtures.update_all(status: "Suspended")
            end
        end

        db.disconnet
    end
    
end