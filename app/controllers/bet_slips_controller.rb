class BetSlipsController < ApplicationController
	before_action :authenticate_user!
	include CurrentCart
	before_action :set_cart
	def index
		@bet_slips = current_user.bet_slips.all.order("created_at DESC").page params[:page]
	end
	
	def create
		cart_id = bet_slips_params[:cart_id]
		@cart = Cart.find(cart_id)
		
		#check if the stake is present and contains only digits
		if bet_slips_params[:stake].present? && bet_slips_params[:stake].scan(/\D/).empty?
			stake = bet_slips_params[:stake].to_f
			
			#check if there is sufficient balance
			if stake <= current_user.balance
				#MTS takes precedence
				#start betslip creation process all under a transaction
				#create the betslip
				
				BetSlip.transaction do
					
					bet_slip = current_user.bet_slips.create!
					@cart.line_bets.each do |bet|
						product = bet.market.include?("Pre") ? "3" : "1"
						market_id = bet.market.scan(/\d/).join('').to_i #extract only the numbers in the market number
						if fetch_market_status(bet.market, bet.fixture_id) == "Active"
							odd = fetch_current_odd(bet.market, bet.fixture_id, "outcome_#{bet.outcome}").to_f
							user_bet = current_user.bets.build(bet_slip_id: bet_slip.id,fixture_id: bet.fixture_id,outcome_id: bet.outcome,market_id: market_id , odds: odd, status: "Pending", product: product, outcome_desc: bet.description )
							user_bet.save!
						end
					end
					
					#create the betslip
					@bets = bet_slip.bets
					total_odds = @bets.pluck(:odds).map(&:to_f).inject(:*).round(2)
					potential_win_amount = (stake.to_f * total_odds )
					bet_slip.update!(bet_count: @bets.count, stake: stake, odds: total_odds, status: "Pending", potential_win_amount: potential_win_amount)
					
					#process the betslips through MTS
					if browser.device.mobile?
						channel = "mobile"
					else
						channel = "internet"
					end
					Mts::SubmitTicket.new.publish(slip_id: bet_slip.id, channel: channel, ip: request.remote_ip )
					
					#delete the session and also delete the cart
					@cart.destroy if @cart.id == session[:cart_id]
					session[:cart_id] = nil
				end
				#redirect to home page with a notification
				redirect_to root_path, notice: "Thank You! Bets are being processed. "
			else
				flash[:alert] = "You have insufficient balance on your account. Please deposit some money."
				redirect_back(fallback_location: root_path)#, alert: "You have insufficient balance on your account. Please deposit some money. "
			end
		else
			flash[:alert] = "Please add a correct stake amount"
			redirect_back(fallback_location: root_path)
			#redirect_to root_path, alert: "Please add a correct stake amount "
		end
	rescue Exception => error
		#log the error and redirect with an alert
		Rails.logger.error(error.message)
		Rails.logger.error(error.backtrace.join("\n"))
		flash[:alert] = "Oops! Something went wrong."
		redirect_back(fallback_location: root_path)
		#redirect_to root_path, alert: "Oops! Something went wrong."
		
	end
	
	def show
		@bet_slip = BetSlip.find(params[:id])
	end
	
	def update
	end
	
	private
	def bet_slips_params
		params.permit(:cart_id,:stake)
	end
	
	def fetch_market_status(market, fixture_id)
		status = market.constantize.find_by(fixture_id: fixture_id).status
		return status
	end
	
	def fetch_current_odd(market, fixture_id, outcome)
		odd = market.constantize.find_by(fixture_id: fixture_id).send(outcome)
		return odd
	end
	
end
