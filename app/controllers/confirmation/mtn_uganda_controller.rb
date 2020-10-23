class Confirmation::MtnUgandaController < ApplicationController
    #before_action :authenticate_source, :if => proc {Rails.env.production?}
    skip_before_action :verify_authenticity_token, raise: false

    require 'logger'
    @@logger ||= Logger.new("#{Rails.root}/log/mtn_mobile_money.log")
    @@logger.level = Logger::ERROR

    def create
      request_body = Hash.from_xml(request.body.read)
      Rails.logger.debug(request_body)

    rescue StandardError => e
        @@logger.error(e.message)
    end
end
