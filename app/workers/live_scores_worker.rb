require 'sidekiq'

class LiveScoresWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical", retry: false

    def perform(message, routing_key)

        update_attr = {
            
        }

        soccer_status = {
            1 => "not_started",
            2 => "live",
            3 => "finished",
            4 => "cancelled",
            5 => "postponed",
            6 => "interrupted",
            7 => "Abandoned",
            8 => "coverage lost",
            9 => "about to start"
        }
        

        if message["Body"].has_key?("Events") 
            if message["Body"]["Events"].is_a?(Array) 
                message["Body"]["Events"].each do |event|
                    if event.has_key?("FixtureId")
                        event_id = event["FixtureId"]
                        fixture = Fixture.find_by(event_id: event_id)
                        if fixture
                            
                            if event.has_key?("Livescore") && event["Livescore"].is_a?(Array)
                                event["Livescore"].each do |score|
                                    status = score["Scoreboard"]["Status"]
                                    update_attr["status"] = soccer_status[status]
                                    match_time = (score["Scoreboard"]["Time"]).to_i
                                    update_attr["match_time"] = "#{match_time/60}:#{match_time%60}"
                                    update_attr["home_score"] = score["Scoreboard"]["Results"][0]["Value"]
                                    update_attr["away_score"] = score["Scoreboard"]["Results"][1]["Value"]
                                end

                            end
                            
                            if event.has_key?("Livescore") && event["Livescore"].is_a?(Hash)
                                score = event["Livescore"]
                                status = score["Scoreboard"]["Status"]
                                update_attr["status"] = soccer_status[status]
                                match_time = (score["Scoreboard"]["Time"]).to_i
                                minutes = "%02d" % (match_time/60)
                                seconds = "%02d" % (match_time%60)
                                update_attr["match_time"] = "#{minutes}:#{seconds}"
                                update_attr["home_score"] = score["Scoreboard"]["Results"][0]["Value"]
                                update_attr["away_score"] = score["Scoreboard"]["Results"][1]["Value"]
                            end
                            fixture.update(update_attr)
                        end
                    end
                end
            end

            if message["Body"]["Events"].is_a?(Hash) 
                event = message["Body"]["Events"]
               if event.has_key?("FixtureId")
                    event_id = event["FixtureId"]
                    fixture = Fixture.find_by(event_id: event_id)
                    if fixture
                        
                        if event.has_key?("Livescore") && event["Livescore"].is_a?(Array)
                            event["Livescore"].each do |score|
                                score = event["Livescore"]
                                status = score["Scoreboard"]["Status"]
                                update_attr["status"] = soccer_status[status]
                                match_time = (score["Scoreboard"]["Time"]).to_i
                                update_attr["match_time"] = "#{match_time/60}:#{match_time%60}"
                                update_attr["home_score"] = score["Scoreboard"]["Results"][0]["Value"]
                                update_attr["away_score"] = score["Scoreboard"]["Results"][1]["Value"]
                            end

                        end
                        if event.has_key?("Livescore") && event["Livescore"].is_a?(Hash)
                            score = event["Livescore"]
                            status = score["Scoreboard"]["Status"]
                            update_attr["status"] = soccer_status[status]
                            match_time = (score["Scoreboard"]["Time"]).to_i
                            update_attr["match_time"] = "#{match_time/60}:#{match_time%60}"
                            update_attr["home_score"] = score["Scoreboard"]["Results"][0]["Value"]
                            update_attr["away_score"] = score["Scoreboard"]["Results"][1]["Value"]
                        end
                        fixture.update(update_attr)
                    end
                end 
            end
        end
    end

end
