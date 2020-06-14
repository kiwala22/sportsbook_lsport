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
        groups = message["bet_stop"]["groups"]

        producer_type = {
            "1" => "Live",
            "3" => "Pre"
        }

        if groups == "all"
            markets = ["1","60", "10", "63", "18","68", "29", "75", "16", "66"]
            markets.each do |market|
                model_name = "Market" + market + producer_type[product]
                market_entry = model_name.constantize.where("status = ? AND event_id = ?", "Active", event_id).first
                if market_entry
                    market_entry.update_attributes(status: "Suspended")
                end
            end
        end
        if product == "3"
            fixture = SoccerFixture.find_by(event_id: event_id)
            if fixture
                fixture.update_attributes(status: "closed")
            end
        end
        

    end
    
end