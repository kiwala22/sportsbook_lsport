class Mts::SubmitTicket
  require 'json'
  require 'json/ext'
  
  QUEUE_NAME = "skyline_skyline-Submit-node#{ENV['NODE_ID']}".freeze
  EXCHANGE_NAME = 'skyline_skyline-Submit'.freeze
  
  
  def publish(slip_id:, user_channel: "internet", ip: nil )
    # find the betslip and xtract the bets array
    betslip = BetSlip.find(slip_id)
    bets = betslip.bets
    bets_array  = []
    bets.each do |bet|
      
      if bet.specifier.present?
        uof_id = "uof:#{bet.product}/sr:sport:1/#{bet.market_id}/#{bet.outcome_id}?#{bet.specifier}"
      else 
        uof_id = "uof:#{bet.product}/sr:sport:1/#{bet.market_id}/#{bet.outcome_id}"
      end
      
      bets_array << {"eventId" => bet.fixture.event_id , "id"=> uof_id, "odds" => (bet.odds * 10000).to_i }
    end
    
    #connect to the mqp and send ticket
    channel = BunnyQueueService.connection.create_channel
    exchange = channel.fanout(
      EXCHANGE_NAME,
      :durable => true
    ) 


    #bind to the exchange then publish
    headers = { 'replyRoutingKey' => "node#{ENV['NODE_ID']}.ticket.confirm"}
    json_data = payload(slip_id: betslip.id, ts: (betslip.created_at.to_i * 1000), channel: user_channel, ip: ip, bets: bets_array, stake: betslip.stake, user_id: betslip.user_id )
    Rails.logger.error(json_data)
    exchange.publish(json_data, headers: headers)
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
          "limitId" => 2158 
        },
        "version" => "2.3"
      }
      
      json_data = JSON.generate(data)
      return json_data
    end
  end