require 'sidekiq' 
include Betradar

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

        response_body = fetch_fixture(event_id)
        payload = Hash.from_xml(response_body)
        event = payload["fixtures_fixture"]["fixture"]
        update_attr = {scheduled_time: event["scheduled"],
            status: event["status"],
            live_odds: event["liveodds"],
            tournament_round: event["tournament_round"]["group_long_name"],
            betradar_id: event["tournament_round"]["betradar_id"],
            tournament_id: event["tournament"]["id"],
            tournament_name: event["tournament"]["name"],
            sport_id: event["tournament"]["sport"]["id"],
            sport: event["tournament"]["sport"]["name"],
            category_id: event["tournament"]["category"]["id"],
            category: event["tournament"]["category"]["name"],
            comp_one_id: event["competitors"]["competitor"][0]["id"],
            comp_one_name: event["competitors"]["competitor"][0]["name"],
            comp_one_abb: event["competitors"]["competitor"][0]["abbreviation"],
            comp_one_gender: event["competitors"]["competitor"][0]["gender"],
            comp_one_qualifier: event["competitors"]["competitor"][0]["qualifier"],
            comp_two_id: event["competitors"]["competitor"][1]["id"],
            comp_two_name: event["competitors"]["competitor"][1]["name"],
            comp_two_abb: event["competitors"]["competitor"][1]["abbreviation"],
            comp_two_gender: event["competitors"]["competitor"][1]["gender"],
            comp_two_qualifier: event["competitors"]["competitor"][1]["qualifier"]
         }
         if event.has_key?("season")
            update_attr[:season_id] = event["season"]["id"] 
            update_attr[:season_name] = event["season"]["name"]
         end   

        #find the fixture in the database
        fixture = Fixture.find_by(event_id: event_id)
        if fixture
            fixture.update(update_attr)
        else
            fixture = Fixture.new(update_attr)
            fixture.event_id = event["id"]
            fixture.save
        end
        
    end
    
end