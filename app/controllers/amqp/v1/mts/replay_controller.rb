class Amqp::V1::Mts::ReplyController < ApplicationController
   skip_before_action :verify_authenticity_token
   before_action :authenticate
	require 'uri'
   require 'cgi'

   def create
      payload = reply_params[:payload]
      message = Hash.from_xml(payload)
      routing_key = reply_params[:routing_key]

      #logs the received information
      Rails.logger.error("#{routing_key} - #{message}")
      render status: 200, json: {response: "OK"}
   end
   private

   def reply_params
      params.permit(:payload, :routing_key)
   end
   
   def authenticate
      auth_token = ENV['AUTH_TOKEN']
      token = request.headers['access-token']
      render json: {status: "Unauthorized. Invalid token"}  unless token == auth_token
   end
end
