class Mts::SubmitTicket
  QUEUE_NAME = '' #'user.mass_update_using_csv'.freeze
  EXCHANGE_NAME = ''
  
  
  def publish(betslip_id:, channel: nil, )
    
    channel = BunnyQueueService.connection.create_channel
    exchange = channel.fanout(EXCHANGE_NAME,:durable => true,:passive => true) 
    #bind to the exchange then publish
    headers = { 'replyRoutingKey' => "#{ENV[:NODE_ID]}.ticket.confirm"}
    exchange.publish(payload.to_json, routing_key: QUEUE_NAME, headers: headers)
  end
  
  private
  
  def payload(slip_id, channel)
    betslip = BetSlip.find(betslip)_id)
    bets = betslip.bet_slips
    bets_array  = []
    bets.each do |bet|
      bets_array << {"eventid" => bet.fixture.event_id , "id"=> "", "odds" => (bet.odds.to_i * 10000) }
    end

    data = {
      "timestampUtc" : 1545044012850,#variable
      "bets" => [ {
        "stake" => {
          "value" => (betslip.stake.to_i * 10000),
          "type" => "total"
        },
        "id" : "ticket_example_20181217105332_3668_0", #variable
        "selectedSystems" => [ bets.count ]
        } ],
        "ticketId" : "ticket_example_20181217105332_3668",
        "selections" => bets_array, #varibales
            "sender" => {
              "currency" => "UGX",
              "channel" : channel,
              "bookmakerId" : ENV[:BOOKMAKER_ID],
              "endCustomer" : {
                "ip" : "127.0.0.1", 
                "languageId" => "EN",
                "id" => betslip.id
              },
              "limitId" : 1409 
            },
            "version" : "2.3"
          }
        end
      end