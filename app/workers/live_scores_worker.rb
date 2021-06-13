require 'sidekiq'

class LiveScoresWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical", retry: false

    def perform(message, routing_key)

        update_attr = {
            
        }
        

        if message["Body"].has_key?("Events") 
            if message["Body"]["Events"].is_a?(Array) 
                message["Body"]["Events"].each do |event|
                    if event.has_key?("FixureId")
                        event_id = event["FixureId"]
                        fixture = Fixture.find_by(event_id: event_id)
                        if fixture
                            #check if there is a markets key and if it is an arrary on a hash
                            if event.has_key?("Livescore") && event["Livescore"].is_a?(Array)
                                event["Livescore"].each do |score|
                                    status = score["Scoreboard"]["Status"]
                                    update_attr["status"] = soccer_status[status]
                                    update_attr["match_time"] = event
                                    update_attr["home_score"] = score["Position"]["1"]
                                    update_attr["away_score"] = score["Position"]["2"]
                                end

                            end
                            if event.has_key?("Livescore") && event["Livescore"].is_a?(Hash)
                                score = event["Livescore"]
                                status = score["Scoreboard"]["Status"]
                                update_attr["status"] = soccer_status[status]
                                update_attr["match_time"] = event
                                update_attr["home_score"] = score["Position"]["1"]
                                update_attr["away_score"] = score["Position"]["2"]
                            end
                            fixture.update(update_attr)
                        end
                    end
                end
            end

            if message["Body"]["Events"].is_a?(Hash) 
                event = message["Body"]["Events"]
               if event.has_key?("FixureId")
                    event_id = event["FixureId"]
                    fixture = Fixture.find_by(event_id: event_id)
                    if fixture
                        #check if there is a markets key and if it is an arrary on a hash
                        if event.has_key?("Livescore") && event["Livescore"].is_a?(Array)
                            event["Livescore"].each do |score|
                                status = score["Scoreboard"]["Status"]
                                update_attr["status"] = soccer_status[status]
                                update_attr["match_time"] = event
                                update_attr["home_score"] = score["Position"]["1"]
                                update_attr["away_score"] = score["Position"]["2"]
                            end

                        end
                        if event.has_key?("Livescore") && event["Livescore"].is_a?(Hash)
                            score = event["Livescore"]
                            status = score["Scoreboard"]["Status"]
                            update_attr["status"] = soccer_status[status]
                            update_attr["match_time"] = event
                            update_attr["home_score"] = score["Position"]["1"]
                            update_attr["away_score"] = score["Position"]["2"]
                        end
                        fixture.update(update_attr)
                    end
                end 
            end
        end
    end

end
