class Confirmation::AirtelUgandaController < ApplicationController
  #before_action :authenticate_source, if: proc { Rails.env.production? }
  skip_before_action :verify_authenticity_token, raise: false

  require 'logger'
  @@logger ||= Logger.new("#{Rails.root}/log/airtel_mobile_money.log")
  @@logger.level = Logger::ERROR

  def create

    # Sample params from Airtel Callback
    # Parameters: {"transaction"=>{"status_code"=>"TF", "code"=>"DP008001016", 
    # "airtel_money_id"=>"18394473031", "id"=>"finaltesting156", 
    # "message"=>"Initiator is invalid"}, 
    # "airtel_uganda"=>{"transaction"=>{"status_code"=>"TF", "code"=>"DP008001016", "airtel_money_id"=>"18394473031", "id"=>"finaltesting156",
    #  "message"=>"Initiator is invalid"}}}

    ## Get transaction ID from params
    transaction_id = params["transaction"]["id"]

    # When callback in initiated call the worker to complete transaction
    CompleteAirtelTransactionsWorker.perform_async(transaction_id)

    render status: 200, json: { response: 'OK' }

  rescue StandardError => e
    @@logger.error(e.message)
  end

  protected

  def authenticate_source
    @accepted_ips = %w[
      41.223.85.245
      172.27.77.136
      172.27.77.137
      172.27.77.138
      172.27.77.135
      172.27.77.145
      172.27.77.147
      172.27.77.148
      172.27.77.151
      172.27.77.152
      172.27.77.153
    ]
    unauthourized_source unless @accepted_ips.include? source_ip
  end

  def unauthourized_source
    render xml: { error: 'Unauthorized' }.to_xml, status: 401
  end

  def source_ip
    request.env['REMOTE_ADDR'] || request.env['HTTP_X_FORWARDED_FOR'] ||
      request.env['HTTP_X_REAL_IP']
  end
end
