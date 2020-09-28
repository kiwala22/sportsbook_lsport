class Mts::SubmitTicket
  QUEUE_NAME = '' #'user.mass_update_using_csv'.freeze
  EXCHANGE_NAME = ''
  
  
  def publish(betslip_id:, channel: "internet", ip: nil )
    # find the betslip and xtract the bets array
    betslip = BetSlip.find(betslip_id)
    bets = betslip.bet_slips
    bets_array  = []
    bets.each do |bet|
      bets_array << {"eventid" => bet.fixture.event_id , "id"=> bet.id, "odds" => (bet.odds.to_i * 10000) }
    end
    
    #connect to the mqp and send ticket
    channel = BunnyQueueService.connection.create_channel
    exchange = channel.fanout(EXCHANGE_NAME,:durable => true,:passive => true) 
    #bind to the exchange then publish
    headers = { 'replyRoutingKey' => "#{ENV[:NODE_ID]}.ticket.confirm"}
    exchange.publish(payload(slip_id: betslip.id, ts: (bestlip.created_at.to_i * 1000), channel: channel, ip: ip, bets: bets_array, stake: betslip.stake, user_id: betslip.user_id ).to_json, routing_key: QUEUE_NAME, headers: headers)
  end
  
  private
  
  def payload(slip_id:, ts:, channel:, ip:, bets:, stake:, user_id: )
    #form the json object
    data = {
      "timestampUtc" : ts,
      "bets" => [ {
        "stake" => {
          "value" => (stake.to_i * 10000),
          "type" => "total"
        },
        "id" : "ticket_example_20181217105332_3668_0",
        "selectedSystems" => [ bets.length ]
      } ],
      "ticketId" : slip_id,
      "selections" => bets,
      "sender" => {
        "currency" => "UGX",
        "channel" : channel,
        "bookmakerId" : ENV[:BOOKMAKER_ID],
        "endCustomer" : {
          "ip" : ip, 
          "languageId" => "EN",
          "id" => user_id
        },
        "limitId" : 1409 
      },
      "version" : "2.3"
    }
  
  end
end