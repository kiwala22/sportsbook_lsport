class BetSlipsController < ApplicationController
   before_action :authenticate_user!
   
   def index
   end
   
   def create
      @cart = Cart.find(bet_slips_params[:cart_id])

      #check if the account has money

      #deduct the money from the account

      #start betslip creation process all under a transaction
      #create the betslip
      bet_slip = @current_user.create()
      @cart.line_bets.each do |bet|
         if fetch_market_status(bet.market, bet.fixture_id) == "Active"
            odd = fetch_current_odd(bet.market, bet.fixture_id, bet.outcome).to_f
            user_bet = @current_user.bets.build(bet_slip_id: bet_slip,fixture_id: bet.fixture_id, odds: odd, status: "Active", market: "", bet_outcome: "" )
            user_bet.save
         end
      end

      #create the betslip
      @bets = bet_slip.bets
      bet_slip.update_attributes(bet_count: @bets.count, stake: "", odds: "", status: "Active", potential_win_amount: "" )

      #redirect to home page with a notification
      redirect_to authenticated_root_path, notice: "Thank You! Bets have been placed. "

      
   end
   
   def show
   end
   
   def update
   end
   
   private
   def bet_slips_params
      params.require(:bet_slip).permit(:cart_id)
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
