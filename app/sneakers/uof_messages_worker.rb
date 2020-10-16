class UofMessagesWorker
   include Sneakers::Worker
   QUEUE_NAME = ""

   @@audit_logger ||= Logger.new("#{Rails.root}/log/audit.log")
   @@audit_logger.level = Logger::INFO
   
   from_queue QUEUE_NAME,
   exchange: 'unifiedfeed',
   # exchange_type: :topic,
   :exchange_options => {
      :type => :topic,
      :durable => true,
      :passive => true,
      :auto_delete => false,
   },
   :queue_options => {
      # :durable => false,
      # :auto_delete => false,
      # :exclusive => true,
      # :passive => true
   },
   routing_key: ["*.*.*.*.*.*.*.-.#","*.*.*.*.*.*.*.#{ENV['NODE_ID']}.#"],
   heartbeat: 5

   def work_with_params(payload, delivery_info, metadata)
      #extract the routing key
      routing_key = delivery_info[:routing_key]

      #extract the sport and message / subject and event
      message = routing_key.split('.')[3]
      sport = routing_key.split('.')[4]
      event = routing_key.split('.')[6]
      
      #convert the xml to a hash
      data = Hash.from_xml(payload)
      #route the messages based on subject, sport and event ID
      case message

      when "alive"
          AlertsWorker.perform_async(data)
      when "odds_change"
         OddsChangeWorker.perform_async(data, sport, event)
         
      when "fixture_change"
         FixtureChangeWorker.perform_async(data, sport, event)
         
      when "bet_settlement"
         BetSettlementWorker.perform_async(data, sport, event)
         
      when "bet_cancel"
         BetCancelWorker.perform_async(data, sport, event)
         
      when "bet_stop"
         BetStopWorker.perform_async(data, sport, event)
         
      when "rollback_bet_settlement"
         RollbackSettlementWorker.perform_async(data, sport, event)
         
      when "rollback_bet_cancel"
         RollbackCancelWorker.perform_async(data, sport, event)         
      end

      #log the message for tracing
      #logs the odds change for test fixture
      if event == "12089914" && (message == "odds_change" || message == "bet_stop")
         log_odds_change(event,data, message)
      end
      #acknowledge reception of message
      ack!
   rescue StandardError => e
      #log the error the payload of the message
      Rails.logger.error(e.message)
      Rails.logger.error e.backtrace.join("\n")
      reject!
   end

   def log_odds_change(event, message, action)
      market_status = {
         "1" => "Active",
         "-1" => "Suspended",
         "0" => "Deactivated",
         "-4" => "Cancelled",
         "-3" => "Settled"
      }
      if action == "odds_change"
         @@audit_logger.info("ODDS CHANGE - #{event}")
         @@audit_logger << "\n"
         if message["odds_change"].has_key?("odds") && message["odds_change"]["odds"].present?
            if message["odds_change"]["odds"].has_key?("market") && message["odds_change"]["odds"]["market"].present?
               if message["odds_change"]["odds"]["market"].is_a?(Array)
                  message["odds_change"]["odds"]["market"].each do |market|
                     if market.has_key?("outcome")
                        if ["1", "29"].include? market["id"]
                           @@audit_logger << "\n"
                           @@audit_logger.info("status: #{market_status[market["status"]]}")
                           @@audit_logger << "\n"
                           @@audit_logger.info("Market #{market["id"]}")
                           @@audit_logger << "\n"
                           market["outcome"].each do |k,v|
                              @@audit_logger.info("#{k} - #{v}")
                           end
                           @@audit_logger << "\n"
                        end
                     end
                  end
               end
               if message["odds_change"]["odds"]["market"].is_a?(Hash)
                  if message["odds_change"]["odds"]["market"].has_key?("outcome")
                     if ["1", "29"].include? message["odds_change"]["odds"]["market"]["id"]
                        @@audit_logger << "\n"
                        @@audit_logger.info("status: #{market_status[message["odds_change"]["odds"]["market"]["status"]]}")
                        @@audit_logger << "\n"
                        @@audit_logger.info("Market #{message["odds_change"]["odds"]["market"]["id"]}")
                        @@audit_logger << "\n"
                        message["odds_change"]["odds"]["market"]["outcome"].each do |k, v|
                           @@audit_logger.info("#{k} - #{v}")
                        end
                        @@audit_logger << "\n"
                     end
                  end
               end
            end
         end
      else
         @@audit_logger.info("BETSTOP - #{event}")
         @@audit_logger << "\n"
      end
   end
end

