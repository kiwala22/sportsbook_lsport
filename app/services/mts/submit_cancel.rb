class Mts::SubmitCancel
   require 'json'
   require 'json/ext'
   
   QUEUE_NAME = "skyline_skyline-Reply-node#{ENV['NODE_ID']}".freeze
   EXCHANGE_NAME = 'skyline_skyline-Reply'.freeze
   
   
   def publish(slip_id:, code: 102 )
    #record the betslip Cancellation
    BetSlipCancel.create!(bet_slip_id: slip_id, status: "Pending")

    #connect to the mqp and send ticket
     channel = BunnyQueueService.connection.create_channel
     exchange = channel.fanout(
       EXCHANGE_NAME,
       :durable => true
     ) 

     #bind to the exchange then publish
     headers = { 'replyRoutingKey' => "node#{ENV['NODE_ID']}.cancel.confirm"}
     json_data = payload(slip_id: slip_id, ts: (Time.now.to_i * 1000), code: code )
     exchange.publish(json_data, routing_key: "cancel" ,headers: headers)
   end
   
   private
   
   def payload(slip_id:, ts:, code: )
     #form the json object
     data = {
      "timestampUtc" => ts,
      "ticketId" => slip_id,
      "sender" => {
        "bookmakerId" => ENV['BOOKMAKER_ID']
      },
      "code" => code,
      "cancelPercent" => 1000000,
      "version" => "2.3"
    }
       
       json_data = JSON.generate(data)
       return json_data
   end
 end