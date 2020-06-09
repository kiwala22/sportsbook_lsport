class Amqp::V1::Sports::SoccerController < ApplicationController
   skip_before_action :verify_authenticity_token
   before_action :authenticate
	require 'uri'
   require 'cgi'

   def create
      payload = soccer_params[:payload]
      routing_key = soccer_params[:routing_key]

      out = Hash.from_xml(payload)
      puts out

      #extract message and sport
      message = routing_key.split('.')[3]
      sport = routing_key.split('.')[4]

      #call worker to process the soccer update
      case message

      when "odds_change"
         Soccer::OddsChangeWorker.perform_async(payload)

      when "fixture_change"
         Soccer::FixtureChangeWorker.perform_async(payload)

      when "bet_settlement"
         Soccer::BetSettlementWorker.perform_async(payload)

      when "bet_cancel"
         Soccer::BetCancelWorker.perform_async(payload)
          
      when "bet_stop"
         Soccer::BetStopWorker.perform_async(payload)

      when "rollback_bet_settlement"
         Soccer::RollbackSettlementWorker.perform_async(payload)

      when "rollback_bet_cancel"
         Soccer::RollbackCancelWorker.perform_async(payload)
      
      end

      render status: 200, json: {response: "OK"}

   end

   private

   def soccer_params
      params.permit(:payload, :routing_key)
   end

   def authenticate
      auth_token = ENV['AUTH_TOKEN']
      token = request.headers['access-token']
      render json: {status: "Unauthorized. Invalid token"}  unless token == auth_token
   end
   
end
