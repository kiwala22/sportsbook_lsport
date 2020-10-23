class Confirmation::AirtelUgandaController < ApplicationController
    before_action :authenticate_source, :if => proc {Rails.env.production?}
    skip_before_action :verify_authenticity_token, raise: false

    require 'logger'
    @@logger ||= Logger.new("#{Rails.root}/log/airtel_mobile_money.log")
    @@logger.level = Logger::ERROR


    def create
        request_body = Hash.from_xml(request.body.read)
        Rails.logger.debug(request_body)
        if request_body['COMMAND']['TYPE'] == "CALLBCKREQ"
            ext_trans_id = request_body['COMMAND']['EXTTRID']
            trans_id = request_body['COMMAND']['TXNID']
            render xml: "<?xml version='1.0' encoding='UTF-8'?><COMMAND><TYPE>CALLBCKRESP</TYPE><TXNID>#{trans_id}</TXNID><EXTTRID>#{ext_trans_id}</EXTTRID><TXNSTATUS>200</TXNSTATUS><MESSAGE>Transaction is successful</MESSAGE></COMMAND>"
            # deposit = Deposit.find_by(transaction_reference: request_body['COMMAND']["EXTTRID"])
            # if deposit
            #     case request_body['COMMAND']["TXNSTATUS"]
            #     when "200"
            #         deposit.update(ext_transaction_id: request_body['COMMAND']["TXNID"], status: "SUCCESS")
            #         CompleteAirtelTransactionsWorker.perform_async(deposit.transaction_id)
            #         render xml: "<?xml version='1.0' encoding='UTF-8'?><COMMAND><TYPE>CALLBCKRESP</TYPE><TXNID>#{deposit.ext_transaction_id}</TXNID><EXTTRID>#{deposit.transaction_id}</EXTTRID><TXNSTATUS>200</TXNSTATUS><MESSAGE>Transaction is successful</MESSAGE></COMMAND>"
            #     else
            #         deposit.update(status: "FAILED", ext_transaction_id: request_body['COMMAND']["TXNID"])
            #         render xml: "<?xml version='1.0' encoding='UTF-8'?><COMMAND><TYPE>CALLBCKRESP</TYPE><TXNID>#{deposit.ext_transaction_id}</TXNID><EXTTRID>#{deposit.transaction_id}</EXTTRID><TXNSTATUS>300</TXNSTATUS><MESSAGE>Transaction has failed</MESSAGE></COMMAND>"
            #     end
            # else
            #     render xml: "<?xml version='1.0' encoding='UTF-8'?><COMMAND><TYPE>CALLBCKRESP</TYPE><TXNSTATUS>300</TXNSTATUS><MESSAGE>Transaction has failed</MESSAGE></COMMAND>"
            # end
        end
    rescue StandardError => e
        @@logger.error(e.message)
    end

    protected

    def authenticate_source
        @accepted_ips = ["41.223.85.245", "172.27.77.136","172.27.77.137","172.27.77.138","172.27.77.135","172.27.77.145","172.27.77.147","172.27.77.148","172.27.77.151","172.27.77.152","172.27.77.153" ]
        unauthourized_source unless @accepted_ips.include? source_ip
    end

    def unauthourized_source
        render xml: {error: 'Unauthorized'}.to_xml, status: 401
    end

    def source_ip
        request.env['REMOTE_ADDR'] || request.env["HTTP_X_FORWARDED_FOR"] || request.env['HTTP_X_REAL_IP']
    end
end
