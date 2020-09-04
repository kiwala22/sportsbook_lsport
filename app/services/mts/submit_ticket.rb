class Mts::SubmitTicket
   QUEUE_NAME = '' #'user.mass_update_using_csv'.freeze
   EXCHANGE_NAME = ''
 
   def initialize(mutations)
     @mutations = mutations
   end
 
   def publish(options = {})
     channel = BunnyQueueService.connection.create_channel
     exchange = channel.fanout(EXCHANGE_NAME,:durable => true,:passive => true) 
     #bind to the exchange then publish
     headers = { 'replyRoutingKey' => "#{ENV[:NODE_ID]}.ticket.confirm"}
     exchange.publish(payload.to_json, routing_key: QUEUE_NAME, headers: headers)
   end
 
   private
 
   def payload
    {
      "timestampUtc" : 1545044012850,#variable
      "bets" : [ {
        "stake" : {
          "value" : 10000,#variable
          "type" : "total"
        },
        "id" : "ticket_example_20181217105332_3668_0", #variable
        "selectedSystems" : [ 2 ] #variables
      } ],
      "ticketId" : "ticket_example_20181217105332_3668",
      "selections" : [ {
        " ventide" : "sr:season:54837",
        "id" : "uof:3/sr:sport:4/534/pre:outcometext:9826?variant=pre:markettext:62723",
        "odds" : 13600
      }, {
        " ventide" : "sr:match:14950205",
        "id" : "uof:3/sr:sport:1/14/1712?hcp=1:0",
        "odds" : 40000
      } ], #varibales
      "sender" : {
        "currency" : "UGX",
        "channel" : "internet",
        "bookmakerId" : ENV[:BOOKMAKER_ID],
        "endCustomer" : {
          "ip" : "127.0.0.1", #variable
          "languageId" : "EN",
          "id" : "endCustomer_384d54" #varibale
        },
        "limitId" : 1409 #varibale
      },
      "version" : "2.3"
    }
   end
 end