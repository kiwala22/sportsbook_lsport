class Fixtures::Soccer::LiveMatchController < ApplicationController
   include CurrentCart
   before_action :set_cart, only: [:index, :show]

   def index
      @q = Fixture.joins(:market1_live).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.location_id NOT IN (?) AND market1_lives.status = ?", "live", "6046", "Active", "Active").order(start_date: :asc)
      
      
      @pagy, @fixtures = pagy(@q.includes(:market1_live).where("market1_lives.status = ?", "Active"))
      respond_to do |format|
         format.html
         format.js
         format.json {
            render json: { fixtures: render_to_string(partial: "live_match_fixture_table", locals: {fixtures: @fixtures}, formats: [:html]), pagination: view_context.pagy_nav(@pagy) }
         }
      end

   end

   def show
      @fixture = Fixture.includes(:market1_live,:market7_live,:market3_live,:market2_live,:market17_live, :market282_live,:market25_live,:market53_live,:market77_live,:market113_live).find(params[:id])
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
         session[:bet_slip]["#{fixture.part_one_name} - #{fixture.part_two_name}"] =  {fixture: fixture_id, market: market, out_come: outcome, description: "#{fixture.part_one_name} - #{fixture.part_two_name}", odd: odd}
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