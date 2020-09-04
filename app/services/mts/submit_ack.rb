class Mts::SubmitAck
   QUEUE_NAME = '' #'user.mass_update_using_csv'.freeze
   EXCHANGE_NAME = ''
 
   def initialize(mutations)
     @mutations = mutations
   end
 
   def publish(options = {})
     channel = BunnyQueueService.connection.create_channel
     exchange = channel.topic(EXCHANGE_NAME,:durable => true,:passive => true) 
     #bind to the exchange then publish
     headers = { 'replyRoutingKey' => "#{ENV[:NODE_ID]}.ticket.confirm"}
     exchange.publish(payload.to_json, routing_key: QUEUE_NAME, headers: headers)
   end
 
   private
 
   def payload
      {
         "$schema":"http://json-schema.org/draft-04/schema#",
         "type":"object",
         "properties":{
            "sender":{
               "type":"object",
               "properties":{
                  "bookmakerId":{
                     "type":"integer"
                  }
               },
               "required":[
                  "bookmakerId"
               ]
            },
            "ticketId":{
               "type":"string"
            },
            "ticketCancelStatus":{
               "type": "string",
               "enum":[
                  "not_cancelled",
                  "cancelled"
               ]
            },
            "code":{
               "type":"integer"
            },
            "message":{
               "type":"string"
            },
            "timestampUtc":{
               "type":"number"
            },
            "version":{
               "type":"string",
               "description":"JSON format version (must be '2.3')",
               "pattern":"^(2\\.3)$",
               "minLength":3,
               "maxLength":3
            }
         },
         "required":[
            "sender",
            "ticketId",
            "ticketCancelStatus",
            "timestampUtc",
            "version"
         ]
      }
      
   end
 end