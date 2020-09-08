module MobileMoney
	class AirtelUganda

		require 'openssl'
		require 'json'
		require 'uri'
		require 'net/http'
		require 'logger'

		@@logger ||= Logger.new("#{Rails.root}/log/airtel_mobile_money.log")
		@@logger.level = Logger::ERROR

		@@payout_msisdn =
		@@collection_msisdn =

		@@payout_username =
		@@payout_password =

		@@collection_username =
		@@collection_password =

		@@payout_pin =
		@@collection_pin =

		@@payment_interface =
		# @@payment_msisdn =
		# @@payment_username =
		# @@payment_password =
		@@payment_billerID =




		def self.make_disbursement(phone_number, amount, transaction_id)
			phone_number = phone_number[3..-1]
			url = "http://172.27.77.145:9192/services/UTL?LOGIN=#{@@payout_username}&PASSWORD=#{@@payout_password}&REQUEST_GATEWAY_CODE=WEB&REQUEST_GATEWAY_TYPE=WEB&requestText="
			req_xml = "<?xml version='1.0' encoding='UTF-8'?><COMMAND><SNDINSTRUMENT>12</SNDINSTRUMENT><MSISDN>#{@@payout_msisdn}</MSISDN><PAYID>12</PAYID><SNDPROVIDER>101</SNDPROVIDER><language>en</language><RCVINSTRUMENT>12</RCVINSTRUMENT><LANGUAGE2>1</LANGUAGE2><PAYID2>12</PAYID2><LANGUAGE1>1</LANGUAGE1><PAYID1>12</PAYID1><PROVIDER1>101</PROVIDER1><PIN>#{@@payout_pin}</PIN><PROVIDER2>101</PROVIDER2><RCVPROVIDER>101</RCVPROVIDER><IS_MERCHANT_CASHIN>Y</IS_MERCHANT_CASHIN><MERCHANT_TXN_ID>#{transaction_id}</MERCHANT_TXN_ID><PROVIDER>101</PROVIDER><BPROVIDER>101</BPROVIDER><PIN_CHECK>FALSE</PIN_CHECK><TYPE>RCIREQ</TYPE><AMOUNT>#{amount}</AMOUNT><MSISDN2>#{phone_number}</MSISDN2><interfaceId>SUPA3</interfaceId><USERNAME>#{@@payout_username}</USERNAME><PASSWORD>#{@@payout_password}</PASSWORD></COMMAND>"
			uri = URI.parse(url)
			http = Net::HTTP.new(uri.host, uri.port)
			http.read_timeout = 180
			request = Net::HTTP::Post.new(uri.request_uri)
			request.content_type = 'text/xml'
			request.body = req_xml
			# http.use_ssl = true
			# http.verify_mode = OpenSSL::SSL::VERIFY_NONE
			http.set_debug_output($stdout)
			res = http.request(request)
			result = Hash.from_xml(res.body)
			if result.has_key?("COMMAND") && res.code == "200"
				return {ext_transaction_id: result['COMMAND']['TXNID'], status: result['COMMAND']['TXNSTATUS'] , message: result['COMMAND']['MESSAGE'] }
			else
				@@logger.error(result)
				return nil
			end

		rescue StandardError => e
			@@logger.error(e.message)
		end


		def self.request_payments(phone_number, amount, transaction_id)
			message = "BETSB DEPOSIT"
			phone_number = phone_number[3..-1]
			url = "http://172.27.77.145:9192/services/UTL?LOGIN=#{@@payment_username}&PASSWORD=#{@@payment_password}&REQUEST_GATEWAY_CODE=EXT001&REQUEST_GATEWAY_TYPE=EXTSYS"
      req_xml = "<?xml version='1.0' encoding='UTF-8'?><COMMAND><interfaceId>#{@@payment_interface}</interfaceId><MSISDN>#{phone_number}</MSISDN><MSISDN2>#{@@payment_msisdn}</MSISDN2><AMOUNT>#{amount}</AMOUNT><EXTTRID>#{transaction_id}</EXTTRID><REFERENCE></REFERENCE><BILLERID>#{@@payment_billerID}</BILLERID><MESSAGE>#{message}</MESSAGE><serviceType>MERCHPAY</serviceType><USERNAME>#{@@payment_username}</USERNAME><PASSWORD>#{@@payment_password}</PASSWORD></COMMAND>"
			uri = URI.parse(url)
			http = Net::HTTP.new(uri.host, uri.port)
			http.read_timeout = 180
			request = Net::HTTP::Post.new(uri.request_uri)
			request.content_type = 'text/xml'
			request.body = req_xml
			# http.use_ssl = true
			# http.verify_mode = OpenSSL::SSL::VERIFY_NONE
			http.set_debug_output($stdout)
			res = http.request(request)
			result = Hash.from_xml(res.body)
			if result.has_key?("COMMAND")  && result['COMMAND']['TYPE'] == "CMPRRESP" && res.code == "200"
				return {ext_transaction_id: result['COMMAND']['TXNID'], transaction_id: result['COMMAND']['EXTRA'], status: result['COMMAND']['TXNSTATUS'] }
			else
				@@logger.error(result)
				return nil
			end
		rescue StandardError => e
			@@logger.error(e.message)
		end

		def self.check_transaction_status(ext_transaction_id)
			url = "http://172.27.77.145:9192/services/UTL?LOGIN=#{@@payout_username}&PASSWORD=#{@@payout_password}&REQUEST_GATEWAY_CODE=EXT001&REQUEST_GATEWAY_TYPE=EXTSYS"
			req_xml = "<?xml version='1.0' encoding='UTF-8'?><COMMAND><TYPE>TXNEQREQ</TYPE><interfaceId>SUPA3</interfaceId><EXTTRID>#{ext_transaction_id}</EXTTRID><TRID></TRID></COMMAND>"
			uri = URI.parse(url)
			http = Net::HTTP.new(uri.host, uri.port)
			request = Net::HTTP::Post.new(uri.request_uri)
			request.content_type = 'text/xml'
			request.body = req_xml
			# http.use_ssl = true
			# http.verify_mode = OpenSSL::SSL::VERIFY_NONE
			http.set_debug_output($stdout)
			res = http.request(request)
			result = Hash.from_xml(res.body)
			if result.has_key?("COMMAND") && res.code == "200"
				return {status: result['COMMAND']['TXNSTATUS'], message: result['COMMAND']['MESSAGE'] }
			else
				@@logger.error(result)
				return nil
			end

		rescue StandardError => e
			@@logger.error(e.message)
		end

		def self.get_collection_balance
			url = "http://172.27.77.145:9192/services/UTL?LOGIN=#{@@collection_username}&PASSWORD=#{@@collection_password}&REQUEST_GATEWAY_CODE=EXT001&REQUEST_GATEWAY_TYPE=EXTSYS"
			req_xml = "<?xml version='1.0' encoding='UTF-8'?><COMMAND><BPROVIDER>101</BPROVIDER><PAYID1>12</PAYID1><PAYID2>12</PAYID2><PAYID>12</PAYID><PIN>#{@@collection_pin}</PIN><language>en</language><PROVIDER>101</PROVIDER><MSISDN>#{@@collection_msisdn}</MSISDN><TYPE>RBEREQ</TYPE></COMMAND>"
			uri = URI.parse(url)
			http = Net::HTTP.new(uri.host, uri.port)
			request = Net::HTTP::Post.new(uri.request_uri)
			request.content_type = 'text/xml'
			request.body = req_xml
			# http.use_ssl = true
			# http.verify_mode = OpenSSL::SSL::VERIFY_NONE
			http.set_debug_output($stdout)
			res = http.request(request)
			result = Hash.from_xml(res.body)
			if result.has_key?("COMMAND") && result['COMMAND'].has_key?("BALANCE") && res.code == "200"
				return {amount: result['COMMAND']['BALANCE'], currency: "UGX", status: result['COMMAND']['TXNSTATUS'] }
			else
				@@logger.error(result)
				return nil
			end

		rescue StandardError => e
			@@logger.error(e.message)
		end

		def self.get_payout_balance
			url = "http://172.27.77.145:9192/services/UTL?LOGIN=#{@@payout_username}&PASSWORD=#{@@payout_password}&REQUEST_GATEWAY_CODE=EXT001&REQUEST_GATEWAY_TYPE=EXTSYS"
			req_xml = "<?xml version='1.0' encoding='UTF-8'?><COMMAND><BPROVIDER>101</BPROVIDER><PAYID1>12</PAYID1><PAYID2>12</PAYID2><PAYID>12</PAYID><PIN>#{@@payout_pin}</PIN><language>en</language><PROVIDER>101</PROVIDER><MSISDN>#{@@payout_msisdn}</MSISDN><TYPE>RBEREQ</TYPE></COMMAND>"
			uri = URI.parse(url)
			http = Net::HTTP.new(uri.host, uri.port)
			request = Net::HTTP::Post.new(uri.request_uri)
			request.content_type = 'text/xml'
			request.body = req_xml
			# http.use_ssl = true
			# http.verify_mode = OpenSSL::SSL::VERIFY_NONE
			http.set_debug_output($stdout)
			res = http.request(request)
			result = Hash.from_xml(res.body)
			if result.has_key?("COMMAND") && result['COMMAND'].has_key?("BALANCE") && res.code == "200"
				return {amount: result['COMMAND']['BALANCE'], currency: "UGX", status: result['COMMAND']['TXNSTATUS'] }
			else
				@@logger.error(result)
				return nil
			end

		rescue StandardError => e
			@@logger.error(e.message)
		end

	end

end
