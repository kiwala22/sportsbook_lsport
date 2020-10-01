class Amqp::V1::Sports::SoccerController < ApplicationController
   skip_before_action :verify_authenticity_token
   before_action :authenticate
   require 'uri'
   require 'cgi'
   
   @@betradar_logger ||= Logger.new("#{Rails.root}/log/betradar.log")
   
   def create
      payload = soccer_params[:payload]
      routing_key = soccer_params[:routing_key]
      
      output = Hash.from_xml(payload)
      
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
      
      #logs the odds change for test fixture
      if routing_key.split('.')[6] == "12089914"
         log_odds_change(output)
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
   
   def log_odds_change(message)
      market_status = {
         "1" => "Active",
         "-1" => "Suspended",
         "0" => "Deactivated",
         "-4" => "Cancelled",
         "-3" => "Settled"
      }
      if message["odds_change"].has_key?("odds") && message["odds_change"]["odds"].present?
         if message["odds_change"]["odds"].has_key?("market") && message["odds_change"]["odds"]["market"].present?
            if message["odds_change"]["odds"]["market"].is_a?(Array)
               message["odds_change"]["odds"]["market"].each do |market|
                  if market.has_key?("outcome")
                     if ["1", "29"].include? market["id"]
                        @@betradar_logger << "\n"
                        @@betradar_logger.info("status: #{market_status[market["status"]]}")
                        @@betradar_logger << "\n"
                        @@betradar_logger.info("Market #{market["id"]}")
                        @@betradar_logger << "\n"
                        market["outcome"].each do |k,v|
                           @@betradar_logger.info("#{k} - #{v}")
                        end
                        @@betradar_logger << "\n"
                     end
                  end
               end
            end
            if message["odds_change"]["odds"]["market"].is_a?(Hash)
               if message["odds_change"]["odds"]["market"].has_key?("outcome")
                  if ["1", "29"].include? message["odds_change"]["odds"]["market"]["id"]
                     @@betradar_logger << "\n"
                     @@betradar_logger.info("status: #{market_status[message["odds_change"]["odds"]["market"]["status"]]}")
                     @@betradar_logger << "\n"
                     @@betradar_logger.info("Market #{message["odds_change"]["odds"]["market"]["id"]}")
                     @@betradar_logger << "\n"
                     message["odds_change"]["odds"]["market"]["outcome"].each do |k, v|
                        @@betradar_logger.info("#{k} - #{v}")
                     end
                     @@betradar_logger << "\n"
                  end
               end
            end
         end
      end
   end
   
   
end
