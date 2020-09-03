class Mts::SubmitTicket
   QUEUE_NAME = '' #'user.mass_update_using_csv'.freeze
   EXCHANGE_NAME = ''
 
   def initialize(mutations)
     @mutations = mutations
   end
 
   def publish(options = {})
     channel = BunnyQueueService.connection.create_channel
     exchange = channel.fanout(EXCHANGE_NAME,:durable => true,:passive => true) 
     headers = { 'replyRoutingKey' => options[:delay_time].to_i * 1_000 } if options[:delay_time].present?
     exchange.publish(payload.to_json, routing_key: QUEUE_NAME, headers: headers)
   end
 
   private
 
   def payload
     {
       mutations: @mutations
     }
   end
 end