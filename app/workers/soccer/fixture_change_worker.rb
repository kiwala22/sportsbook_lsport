require 'sidekiq' 

class Soccer::FixtureChangeWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical"
    sidekiq_options retry: false

    def perform(payload)
        #convert the message from the xml to an easr ruby Hash using active support
        message = Hash.from_xml(payload)
        event_id = message["fixture_change"]["event_id"]
        product =  message["fixture_change"]["product"]
        if message.has_key?("change_type")
            change_type = message["fixture_change"]["change_type"]
        end

        #call the api to update the fixture on the main sportsbook application
        #pull fixture date from server
        
        #find the fixture in the database
        fixture = SoccerFixture.find_by(event_id: event_id)
        if fixture

        else

        end
        
    end
    
end