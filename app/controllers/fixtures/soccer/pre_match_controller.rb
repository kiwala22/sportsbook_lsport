class Fixtures::Soccer::PreMatchController < ApplicationController
   include CurrentCart
   before_action :set_cart, only: [:index, :show]

   def index
     if params[:q].present?
      parameters = ["fixtures.status= 'not_started'", "fixtures.sport_id='6046'", "fixtures.league_id NOT IN ('37364', '37386', '38301', '37814')", "market1_pres.status = 'Active'", "fixtures.start_date >= '#{Time.now}'" ]
      if params[:q][:league_name].present?
      parameters << "fixtures.league_name='#{params[:q][:league_name]}'"
      end
      if params[:q][:location].present?
      parameters << "fixtures.location='#{params[:q][:location]}'"
      end
      conditions = parameters.join(" AND ")
      @q = Fixture.joins(:market1_pre).where(conditions).order(start_date: :asc)
     else
      @q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND market1_pres.status = ?", "not_started", "6046", ["37364", "37386", "38301", "37814"], (Time.now), (Date.today.end_of_day + 10.months), "Active").order(start_date: :asc)
     end

      @pagy, @fixtures = pagy(@q.includes(:market1_pre).where("market1_pres.status = ?", "Active"))
      respond_to do |format|
         format.html
         format.json {
            render json: {
              fixtures: render_to_string(partial: "pre_match_fixture_table", locals: {fixtures: @fixtures}, formats: [:html]), pagination: view_context.pagy_nav(@pagy)
             }
         }
         format.js

      end

   end


   def featured    
      @q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND market1_pres.status = ?", "not_started", "6046", ["37364", "37386", "38301", "37814"], (Time.now), (Date.today.end_of_day + 10.months), "Active").order(start_date: :asc)

      @pagy, @featured = pagy(@q.includes(:market1_pre).where("market1_pres.status = ? AND fixtures.featured = ?", "Active", true))
      
      respond_to do |format|
         format.html
         format.js
         format.json {
            render json: {
              fixtures: render_to_string(partial: "feat_pre_match_fixture_table", locals: {featured: @featured}, formats: [:html]), pagination: view_context.pagy_nav(@pagy)
             }
         }

      end
     
   end


   def page_refresh
      render :action => :index and return
   end


   def show
      @fixture = Fixture.includes(:market1_pre,:market7_pre,:market3_pre,:market2_pre,:market17_pre, :market282_pre,:market25_pre,:market53_pre,:market77_pre,:market113_pre).find(params[:id])
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
