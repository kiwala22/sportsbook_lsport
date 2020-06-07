class Amqp::V1::AlertsController < ApplicationController
   skip_before_action :verify_authenticity_token
   before_action :authenticate
	require 'uri'
   require 'cgi'

   def create
      payload = alert_params[:payload]
      routing_key = alert_params[:routing_key]

      #extract message and sport
      message = routing_key.split('.')[3]
      sport = routing_key.split('.')[4]

      #call worker to process the alert
      if message == 'alive'
         AlertsWorker.perform_async(payload)
      end

      render status: 200, json: {response: "OK"}
   end

   private

   def alert_params
      params.permit(:payload, :routing_key)
   end
   
   def authenticate
      auth_token = ENV['AUTH_TOKEN']
      token = request.headers['access-token']
      render json: {status: "Unauthorized. Invalid token"}  unless token == auth_token
   end
end
