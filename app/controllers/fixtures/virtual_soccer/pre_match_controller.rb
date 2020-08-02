class Fixtures::VirtualSoccer::PreMatchController < ApplicationController
   include CurrentCart
   before_action :set_cart, only: [:index, :show]
   
   def index
      if params[:q].present?
         @q = Fixture.joins(:market1_pre).where("status = ? AND sport_id = ? AND category_id IN (?) AND scheduled_time >= ? AND scheduled_time <= ?", "not_started", "sr:sport:1", ["sr:category:1033","sr:category:2123"], params[:q][:start], params[:q][:stop])
      else
         @q = Fixture.joins(:market1_pre).where("status = ? AND sport_id = ? AND category_id IN (?) AND scheduled_time >= ? AND scheduled_time <= ?", "not_started", "sr:sport:1", ["sr:category:1033","sr:category:2123"], Time.now, Date.today.end_of_day)
      end
      
      @pagy, @fixtures = pagy(@q.includes(:market1_pre))
      respond_to do |format|
         format.html
         format.js
         format.json {
            render json: { fixtures: render_to_string(partial: "pre_match_fixture_table", locals: {fixtures: @fixtures}, formats: [:html]), pagination: view_context.pagy_nav(@pagy) }
         }
      end

   end

   def show
      @fixture = Fixture.includes(:market1_pre,:market10_pre,:market16_pre,:market18_pre,:market29_pre, :market60_pre,:market63_pre,:market1_pre,:market66_pre,:market68_pre,:market75_pre).find(params[:id])
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