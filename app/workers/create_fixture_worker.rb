class CreateFixtureWorker
    include Sidekiq::Worker
    sidekiq_options queue: "high"
    sidekiq_options retry: false
 
    require 'openssl'
    require 'json'
    require 'uri'
    require 'net/http'
    require 'logger'
 
    @@logger ||= Logger.new("#{Rails.root}/log/lsport.log")
    @@logger.level = Logger::ERROR
 
   
    def perform(event)
        Fixture.find_or_create_by(fixture_id: event["FixtureId"] ) do |fixture|
            fixture.start_date = event["Fixture"]["StartDate"]
            fixture.status = event["Fixture"]["Status"]
            # fixture.live_odds = event["liveodds"]
            # fixture.tournament_round = event["tournament_round"]["group_long_name"]
            fixture.ext_provider_id = event["Fixture"]["ExternalProviderId"]
            # fixture.season_id = event["season"]["id"] if event.has_key?("season")
            # fixture.season_name = event["season"]["name"] if event.has_key?("season")
            fixture.league_id = event["Fixture"]["League"]["Id"]
            fixture.league_name = event["Fixture"]["League"]["Name"]
            fixture.sport_id = event["Fixture"]["Sport"]["Id"]
            fixture.sport = event["Fixture"]["Sport"]["Name"]
            fixture.location_id = event["Fixture"]["Location"]["Id"]
            fixture.location = event["Fixture"]["Location"]["Name"]
            fixture.part_one_id = event["Fixture"]["Participants"][0]["Id"]
            fixture.part_one_name = event["Fixture"]["Participants"][0]["Name"]
           
            fixture.part_two_id = event["Fixture"]["Participants"][1]["Id"]
            fixture.part_two_name = event["Fixture"]["Participants"][1]["Name"]
            
        end
    end
 end
 