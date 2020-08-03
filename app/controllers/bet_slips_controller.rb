class BetSlipsController < ApplicationController
	before_action :authenticate_user!
	def index
		@bet_slips = BetSlip.all.order("created_at DESC").page params[:page]
	end

	def create
		cart_id = bet_slips_params[:cart_id]
		@cart = Cart.find(cart_id)

		#check if the stake is present and contains only digits
		if bet_slips_params[:stake].present? && bet_slips_params[:stake].scan(/\D/).empty?
			stake = bet_slips_params[:stake].to_f

			#check if there is sufficient balance
			if stake <= current_user.balance
				#reduce the balance and save a transactions
				current_user.balance = (current_user.balance - stake)
				transaction = current_user.transactions.build(balance_before: current_user.balance, balance_after: (current_user.balance - stake), phone_number: current_user.phone_number, status: "SUCCESS", currency: "UGX", amount: stake, category: "Withdraw" )

				#start betslip creation process all under a transaction
				#create the betslip

				BetSlip.transaction do
					#save the transaction
					current_user.save!
					transaction.save!


					bet_slip = current_user.bet_slips.create!
					@cart.line_bets.each do |bet|
						product = bet.market.include?("Pre") ? "3" : "1"
						market_id = bet.market.scan(/\d/).join('').to_i #extract only the numbers in the market number
						if fetch_market_status(bet.market, bet.fixture_id) == "Active"
							odd = fetch_current_odd(bet.market, bet.fixture_id, "outcome_#{bet.outcome}").to_f
							user_bet = current_user.bets.build(bet_slip_id: bet_slip.id,fixture_id: bet.fixture_id,outcome_id: bet.outcome,market_id: market_id , odds: odd, status: "Active", product: product )
							user_bet.save!
						end
					end

					#create the betslip
					@bets = bet_slip.bets
					total_odds = @bets.pluck(:odds).map(&:to_f).inject(:*).round(2)
					potential_win_amount = (stake.to_f * total_odds )
					bet_slip.update_attributes!(bet_count: @bets.count, stake: stake, odds: total_odds, status: "Active", potential_win_amount: potential_win_amount)

					#delete the session and also delete the cart
					@cart.destroy if @cart.id == session[:cart_id]
					session[:cart_id] = nil
				end
				#redirect to home page with a notification
				redirect_to root_path, notice: "Thank You! Bets have been placed. "
			else
				redirect_to root_path, alert: "You have insufficient balance on your account. Please deposit some money. "
			end
		else
			redirect_to root_path, alert: "Please add a correct stake amount "
		end
	rescue Exception => error
		#log the error and redirect with an alert
		logger.error(error)
		redirect_to root_path, alert: "Oops! Something went wrong."

	end

	def show
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
