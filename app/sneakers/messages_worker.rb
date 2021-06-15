class MessagesWorker
   include Sneakers::Worker
   QUEUE_NAME = "skybet"
   
   from_queue QUEUE_NAME,
   exchange: 'odds_feed',
   exchange_type: :topic,
   :exchange_options => {
      :type => :topic,
      :durable => true,
      :auto_delete => false,
   },
   :queue_options => {
      :durable => true,
      # :auto_delete => false,
      # :exclusive => true,
      # :passive => true
   },
   #routing_key: ["pre_match.#","in_play.#"],
   heartbeat: 5

   def work_with_params(payload, delivery_info, metadata)
      #extract the routing key
      routing_key = delivery_info[:routing_key]
      puts("routing_key: #{routing_key}")
      data = JSON.parse(payload)
      #route the messages based on subject, sport and event ID
      message_type = data["Header"]["Type"]
      case message_type

      when 32
          AlertsWorker.perform_async(data, routing_key)

      when 3
         puts("Odds")
         puts(data)
         OddsChangeWorker.perform_async(data, routing_key)
         
      when 1
         puts("Fixtures")
         puts(data)
         FixtureChangeWorker.perform_async(data, routing_key)
         
      when 35
         puts("Settlement")
         puts(data)
         BetSettlementWorker.perform_async(data, routing_key)
         
      when 2
         puts("LiveScore")
         puts(data)
         LiveScoresWorker.perform_async(data, routing_key)
                
      end

      #acknowledge reception of message
      ack!
   rescue StandardError => e
      #log the error the payload of the message
      Rails.logger.error(e.message)
      Rails.logger.error e.backtrace.join("\n")
      reject!
   end

end

