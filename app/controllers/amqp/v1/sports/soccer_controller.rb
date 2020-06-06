class Amqp::V1::Sports::SoccerController < ApplicationController
   before_filter :authenticate
	require 'uri'
   require 'cgi'

   def create
      payload = soccer_params[:payload]
      routing_key = soccer_params[:routing_key]

      #extract message and sport
      message = routing_key.split('.')[3]
      sport = routing_key.split('.')[4]

      #call worker to process the soccer update
      case message

      when "odds_change"
          OddsChangeWorker.perfom_async(payload)

      when "fixture_change"
          FixtureChangeWorker.perfom_async(payload)

      when "bet_settlement"
          BetSettlementWorker.perfom_async(payload)

      when "bet_cancel"
          BetCancelWorker.perfom_async(payload)
          
      when "bet_stop"
          BetStopWorker.perfom_async(payload)

      when "rollback_bet_settlement"
          RollbackSettlementWorker.perfom_async(payload)

      when "rollback_bet_cancel"
          RollbackCancelWorker.perfom_async(payload)
      
      end
      
      render status: 200
   end

   private

   def soccer_params
      params.permit(:payload, :routing_key)
   end

   def authenticate
      auth_token = EVN['AUTH_TOKEN']
      token = request.headers['access-token']
      render json: {status: "Unauthorized. Invalid token"}  unless token == auth_token
   end
   
end
