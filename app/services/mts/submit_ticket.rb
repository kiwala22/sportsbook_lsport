class Mts::SubmitTicket
  QUEUE_NAME = 'skyline_skyline-Submit-node202'.freeze
  EXCHANGE_NAME = 'skyline_skyline-Submit'.freeze
  
  
  def publish(slip_id:, channel: "internet", ip: nil )
    # find the betslip and xtract the bets array
    betslip = BetSlip.find(slip_id)
    bets = betslip.bets
    bets_array  = []
    bets.each do |bet|
      bets_array << {"eventid" => bet.fixture.event_id , "id"=> "uof:#{bet.product}/#{bet.market_id}/#{bet.outcome_id}", "odds" => (bet.odds.to_i * 10000) }
    end
    
    #connect to the mqp and send ticket
    channel = BunnyQueueService.connection.create_channel
    exchange = channel.fanout(
                        EXCHANGE_NAME,
                        :durable => true,
                        :passive => true
              ) 
    #bind to the exchange then publish
    headers = { 'replyRoutingKey' => "#{ENV['NODE_ID']}.ticket.confirm"}
    exchange.publish(payload(slip_id: betslip.id, ts: (betslip.created_at.to_i * 1000), channel: channel, ip: ip, bets: bets_array, stake: betslip.stake, user_id: betslip.user_id ).as_json, routing_key: QUEUE_NAME, headers: headers)
  end
  
  private
  
  def payload(slip_id:, ts:, channel:, ip:, bets:, stake:, user_id: )
    #form the json object
    data = {
      "timestampUtc" => ts,
      "bets" => [ {
        "stake" => {
          "value" => (stake.to_i * 10000),
          "type" => "total"
        },
        "id" => "#{slip_id}_0",
        "selectedSystems" => [ bets.length ]
      } ],
      "ticketId" => slip_id,
      "selections" => bets,
      "sender" => {
        "currency" => "UGX",
        "channel" => channel,
        "bookmakerId" => ENV['BOOKMAKER_ID'],
        "endCustomer" => {
          "ip" => ip, 
          "languageId" => "EN",
          "id" => user_id
        },
        "limitId" => 1409 
      },
      "version" => "2.3"
    }
  
  end
end