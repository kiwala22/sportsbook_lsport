require 'sidekiq' 
include Betradar

class FixtureChangeWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical"
    sidekiq_options retry: false

    def perform(message, routing_key)
        
        if message["Body"].has_key?("Events") 
            if message["Body"]["Events"].is_a?(Array) 
                message["Body"]["Events"].each do |event|
                    if event.has_key?("FixureId")
                        event_id = event["FixureId"]
                        fixture = Fixture.find_by(event_id: event_id)
                        update_attr = {
                            start_date: event["Fixture"]["StartDate"],
                            status: event["Fixture"]["Status"],
                            ext_provider_id: event["Fixture"]["ExternalProviderId"],
                            league_id: event["Fixture"]["League"]["Id"],
                            league_name: event["Fixture"]["League"]["Name"],
                            sport_id: event["Fixture"]["Sport"]["Id"],
                            sport: event["Fixture"]["Sport"]["Name"],
                            location_id: event["Fixture"]["Location"]["Id"],
                            location: event["Fixture"]["Location"]["Name"],
                            part_one_id: event["Fixture"]["Participants"][0]["Participant"]["Id"],
                            part_one_name: event["Fixture"]["Participants"][0]["Participant"]["Name"],
                            part_two_id: event["Fixture"]["Participants"][1]["Participant"]["Id"],
                            part_two_name: event["Fixture"]["Participants"][1]["Participant"]["Name"],
                            
                        }
                       #check if the fixture exists and update it or create it
                        if fixture
                             fixture.update(update_attr)
                        else
                            fixture = Fixture.new(update_attr)
                            fixture.event_id = event_id
                            fixture.save
                        end
                    end
                end
            end

            if message["Body"]["Events"].is_a?(Hash) 
                event = message["Body"]["Events"]
               if event.has_key?("FixureId")
                    event_id = event["FixureId"]
                    fixture = Fixture.find_by(event_id: event_id)
                    update_attr = {
                        start_date: event["Fixture"]["StartDate"],
                        status: event["Fixture"]["Status"],
                        ext_provider_id: event["Fixture"]["ExternalProviderId"],
                        league_id: event["Fixture"]["League"]["Id"],
                        league_name: event["Fixture"]["League"]["Name"],
                        sport_id: event["Fixture"]["Sport"]["Id"],
                        sport: event["Fixture"]["Sport"]["Name"],
                        location_id: event["Fixture"]["Location"]["Id"],
                        location: event["Fixture"]["Location"]["Name"],
                        part_one_id: event["Fixture"]["Participants"][0]["Participant"]["Id"],
                        part_one_name: event["Fixture"]["Participants"][0]["Participant"]["Name"],
                        part_two_id: event["Fixture"]["Participants"][1]["Participant"]["Id"],
                        part_two_name: event["Fixture"]["Participants"][1]["Participant"]["Name"],
                        
                    }
                    #check if the fixture exists and update it or create it
                    if fixture
                         fixture.update(update_attr)
                    else
                        fixture = Fixture.new(update_attr)
                        fixture.event_id = event_id
                        fixture.save
                    end
                end 
            end
        end
        
    end
    
end