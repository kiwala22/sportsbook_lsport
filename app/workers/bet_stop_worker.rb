require 'sidekiq'

class BetStopWorker
    include Sidekiq::Worker
    sidekiq_options queue: "critical", retry: false
    

    def perform(message, sport=nil, event=nil)
        #sleep 1 sec to allow other tasks complete
        sleep 1
        threads = []
        #convert the message from the xml to an easr ruby Hash using active support
        event_id = message["bet_stop"]["event_id"]
        product =  message["bet_stop"]["product"]
        groups = message["bet_stop"]["groups"]

        producer_type = {
            "1" => "Live",
            "3" => "Pre"
        }

        if groups == "all"
            markets = ["1","60", "10", "63", "18","68", "29", "75", "16", "66"]
            #check all markets in parallel
            markets.each do |market|
                threads << Thread.new do
                    model_name = "Market" + market + producer_type[product]
                    #mass update the markets
                    model_name.constantize.where("status = ? AND event_id = ?", "Active", event_id).update_all(status: "Suspended")
                end
            end
            threads.each { |thr| thr.join }
            #find the fixture && refresh at once
            fixture = Fixture.find_by(event_id: event_id)
            if fixture
                CableWorker.perform_async("markets_#{fixture.id}", "")
            end
        end
        
        if product == "3"
            fixture = Fixture.find_by(event_id: event_id)
            if fixture
                fixture.update(status: "closed")
            end
        end
        

    end
    
end