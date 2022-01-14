class MarketAlert < ApplicationRecord

    include Recovery

	# Credentials for distributors
	@@username = "acaciabengo@skylinesms.com"
	@@password = "tyb54634"
	@@prematch_guid = "20bc3235-eb98-422c-9c32-beacc9c9303a"

	# Sports
	@@sports_id = "6046"

	# Package IDs
	@@prematch_pkg_id = "3537"
	@@livematch_pkg_id = "3538"

	# Endpoints
	@@end_point = "https://prematch.lsports.eu/OddService/"
	@@live_end_point = "https://inplay.lsports.eu/api/"


	def check_producers
		(0..5).each do 
			["1", "3"].each do |product|
				if product == "3"
		            threshold = 60
		        end

		        if product == "1"
		            threshold = 20
		        end
				last_update = MarketAlert.where(:product => product).last
				if last_update
					if ((Time.now.to_i ) - last_update[:timestamp].to_i) > threshold
				  		#first close all active markets 
				  		puts "Deactivation::::::: timestamp: #{timestamp}, new stamp: #{last_update[:timestamp]}, product: #{product}"
				  		DeactivateMarketsWorker.perform_async(product)  

					    #then request recovery
					 	request_recovery(product,Time.now.to_i)
					 	
                    end
                end
            end
        end

		sleep 12
	end



end
