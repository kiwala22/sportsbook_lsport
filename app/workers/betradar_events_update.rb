class BetradarEventsUpdate
   include Sneakers::Worker
   QUEUE_NAME = :update_events
   from_queue QUEUE_NAME
   #routing_key: 'ended',

   def work(message)
      response = JSON.parse(message, symbolize_names: true)
      log.ERROR(response)
      ack!
   end
end
