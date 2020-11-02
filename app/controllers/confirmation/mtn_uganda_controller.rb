class Confirmation::MtnUgandaController < ApplicationController
  skip_before_action :verify_authenticity_token
  require 'uri'
  require 'cgi'

  @@mtn_logger ||= Logger.new("#{Rails.root}/log/mtn_error.log")

  def create
    @@mtn_logger.error(request.body)

    render status: 200, json: {response: "OK"}
  end
end
