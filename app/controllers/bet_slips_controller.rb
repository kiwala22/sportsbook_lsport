class BetSlipsController < ApplicationController
	before_action :authenticate_user!
	include CurrentCart
	include BetslipCartHelper
	before_action :set_cart
	def index
		@bet_slips = current_user.bet_slips.all.order("created_at DESC").page params[:page]
	end
	
	def create
		cart_id = bet_slips_params[:cart_id]
		@cart = Cart.find(cart_id)
		
		stake = bet_slips_params[:stake].to_f
		
		#First check if stake is with in the limits
		if stake > 1000000 || stake < 1000
			flash[:alert] = "Stake should be between 1,000 and 1,000,000. Change amount and try again."
			redirect_back(fallback_location: root_path) && return
		end
		#check if the stake is present and contains only digits
		if bet_slips_params[:stake].present? && bet_slips_params[:stake].scan(/\D/).empty?
			stake = bet_slips_params[:stake].to_f
			
			#check if there is sufficient balance
			if stake <= current_user.balance
				previous_balance = current_user.balance
				balance_after = current_user.balance = (current_user.balance - stake)
				transaction = current_user.transactions.build(balance_before: previous_balance, balance_after: balance_after, phone_number: current_user.phone_number, status: "SUCCESS", currency: "UGX", amount: stake, category: "Bet Stake" )
				
				#declare empty array of bets
				bets_arr = []
				
				#create an empty betslip
				bet_slip = current_user.bet_slips.create!
				#create an array of bets
				@cart.line_bets.each do |bet|
					product = bet.market.include?("Pre") ? "3" : "1"
					market_id = bet.market.scan(/\d/).join('').to_i #extract only the numbers in the market number
					if fetch_market_status(bet.market, bet.fixture_id) == "Active"
						odd = fetch_current_odd(bet.market, bet.fixture_id, "outcome_#{bet.outcome}").to_f
						specifier = fetch_specifier(bet.market, bet.fixture_id)
						bets_arr << {user_id: current_user.id ,bet_slip_id: bet_slip.id,fixture_id: bet.fixture_id,outcome_id: bet.outcome,market_id: market_id , odds: odd, status: "Pending", product: product, outcome_desc: bet.description, specifier: specifier }
					end
				end
				
				#initiate the betslip
				odds_arr = bets_arr.map{|x| x[:odds].to_f}
				total_odds = odds_arr.inject(:*).round(2)
				potential_win_amount = (stake.to_f * total_odds )
				
				BetSlip.transaction do
					current_user.save!
					transaction.save!
					Bet.create!(bets_arr)
					bet_slip.update!(bet_count: bets_arr.count, stake: stake, odds: total_odds, status: "Pending", potential_win_amount: potential_win_amount)
				end					
				#process the betslips through MTS
				if browser.device.mobile? || browser.device.tablet?
					channel = "mobile"
				else
					channel = "internet"
				end

				begin
					Mts::SubmitTicket.new.publish(slip_id: bet_slip.id, user_channel: channel, ip: request.remote_ip )
				rescue Exception => error
					#fail the betslip and all the bets
					#refund the user money
					#consider a separate refund function, since it is called from three locations now 05/11/2020 Acacia
					bet_slip.update!(status: "Failed") 
					bet_slip.bets.update_all(status: "Failed")
					#refund the stake
					previous_balance = current_user.balance
					balance_after = current_user.balance = (current_user.balance + bet_slip.stake)
					transaction = current_user.transactions.build(balance_before: previous_balance, balance_after: balance_after, phone_number: current_user.phone_number, status: "SUCCESS", currency: "UGX", amount: bet_slip.stake, category: "Refund" )
					
					BetSlip.transaction do
						current_user.save!
						transaction.save!
					end

					#log the error
					Rails.logger.error(error.message)
					Rails.logger.error(error.backtrace.join("\n"))
				end
				
				#delete the session and also delete the cart
				@cart.destroy if @cart.id == session[:cart_id]
				session[:cart_id] = nil
				
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
