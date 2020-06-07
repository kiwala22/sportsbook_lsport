require 'sidekiq'

class Soccer::BetStopWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical"
    sidekiq_options retry: false

    def perform(payload)
        #convert the message from the xml to an easr ruby Hash using active support
        message = Hash.from_xml(payload)
        event_id = message["bet_stop"]["event_id"]
        product =  message["bet_stop"]["product"]

        fixtures = SoccerFixture.where(event_id: event_id, status: "Active")
        if fixtures
           fixtures.update_all(status: "Suspended")
        end
    end
    
end