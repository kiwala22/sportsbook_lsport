class CreateFixtureWorker
    include Sidekiq::Worker
    sidekiq_options queue: "high"
    sidekiq_options retry: false
 
    require 'openssl'
    require 'json'
    require 'uri'
    require 'net/http'
    require 'logger'
 
    @@logger ||= Logger.new("#{Rails.root}/log/betradar.log")
    @@logger.level = Logger::ERROR
 
    @@end_point = "https://stgapi.betradar.com/v1/"
    @@auth_token = ENV['BETRADAR_TOKEN']
 
    def perform(event)
        Fixture.find_or_create_by(event_id: event["id"] ) do |fixture|
            fixture.scheduled_time = event["scheduled"]
            fixture.status = event["status"]
            fixture.live_odds = event["liveodds"]
            fixture.tournament_round = event["tournament_round"]["group_long_name"]
            fixture.betradar_id = event["tournament_round"]["betradar_id"]
            fixture.season_id = event["season"]["id"] if event.has_key?("season")
            fixture.season_name = event["season"]["name"] if event.has_key?("season")
            fixture.tournament_id = event["tournament"]["id"]
            fixture.tournament_name = event["tournament"]["name"]
            fixture.sport_id = event["tournament"]["sport"]["id"]
            fixture.sport = event["tournament"]["sport"]["name"]
            fixture.category_id = event["tournament"]["category"]["id"]
            fixture.category = event["tournament"]["category"]["name"]
            fixture.comp_one_id = event["competitors"]["competitor"][0]["id"]
            fixture.comp_one_name = event["competitors"]["competitor"][0]["name"]
            fixture.comp_one_abb = event["competitors"]["competitor"][0]["abbreviation"]
            fixture.comp_one_gender = event["competitors"]["competitor"][0]["gender"]
            fixture.comp_one_qualifier = event["competitors"]["competitor"][0]["qualifier"]
            fixture.comp_two_id = event["competitors"]["competitor"][1]["id"]
            fixture.comp_two_name = event["competitors"]["competitor"][1]["name"]
            fixture.comp_two_abb = event["competitors"]["competitor"][1]["abbreviation"]
            fixture.comp_two_gender = event["competitors"]["competitor"][1]["gender"]
            fixture.comp_two_qualifier = event["competitors"]["competitor"][1]["qualifier"]
        end
    end
 end
 