class Fixtures::Soccer::LiveMatchController < ApplicationController
   include CurrentCart
   before_action :set_cart, only: [:index, :show]

   def index
       @q = Fixture.joins(:market1_live).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.category_id NOT IN (?) ", "live", "sr:sport:1", ["sr:category:1033","sr:category:2123"]).order(scheduled_time: :asc)
      
      @pagy, @fixtures = pagy(@q.includes(:market1_live))
      respond_to do |format|
         format.html
         format.js
      end

   end

   def show
      @fixture = Fixture.includes(:market1_live,:market10_live,:market16_live,:market18_live,:market29_live, :market60_live,:market63_live,:market1_live,:market66_live,:market68_live,:market75_live).find(params[:id])
      respond_to do |format|
         format.html
         format.js
      end
   end

   def add_bet
      session[:bet_slip] ||= []

      outcome = params[:outcome_id]
      market =  params[:market]
      fixture_id =  params[:fixture_id].to_i

      
      fixture = Fixture.find(fixture_id)
      market_entry = market.constantize.find_by(fixture_id: fixture_id)

      if market_entry && market_entry.status == "Active"
         odd = market_entry.send(outcome)
         session[:bet_slip]["#{fixture.comp_one_abb} - #{fixture.comp_two_abb}"] =  {fixture: fixture_id, market: market, out_come: outcome, description: "#{fixture.comp_one_abb} - #{fixture.comp_two_abb}", odd: odd}
         @bets = session[:bet_slip]
      else
         #flash the error, market has been suspended or cancelled
      end

      #check the sessions if there is an existing fixture

      respond_to do |format|
         format.js
      end
   end
   
   def clear_slip
      session[:bet_slip] = nil
      @bets = session[:bet_slip]
      respond_to do |format|
         format.js
      end
   end
   
   
end