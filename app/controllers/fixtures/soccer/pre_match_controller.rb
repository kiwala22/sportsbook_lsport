class Fixtures::Soccer::PreMatchController < ApplicationController
   include CurrentCart
   before_action :set_cart, only: [:index, :show]

   def index
     if params[:q].present?
       @check_params = false
       parameters = ["fixtures.status= 'not_started'", "fixtures.sport_id='6046'", "fixtures.league_id NOT IN ('37364', '37386', '38301', '37814')", "market1_pres.status = 'Active'", "fixtures.start_date >= '#{Time.now}'" ]
       if params[:q][:league_name].present?
         @check_params = true
         parameters << "fixtures.league_name='#{params[:q][:league_name]}'"
       end
       if params[:q][:location].present?
         @check_params = true
         parameters << "fixtures.location='#{params[:q][:location]}'"
       end
       conditions = parameters.join(" AND ")
       @q = Fixture.joins(:market1_pre).where(conditions).order(start_date: :asc)
     else
       @check_params = false
       @q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND market1_pres.status = ?", "not_started", "6046", ["37364", "37386", "38301", "37814"], (Time.now), (Date.today.end_of_day + 1.days), "Active").order(start_date: :asc)
     end

      @live_q = Fixture.joins(:market1_live).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND market1_lives.status = ?", "live", "6046", ["37364", "37386", "38301", "37814"], "Active").order(start_date: :asc)
      @live_fixtures = @live_q.includes(:market1_live).where("market1_lives.status = ?", "Active").limit(10)


      @featured = @q.includes(:market1_pre).where("market1_pres.status = ? AND fixtures.featured = ?", "Active", true).limit(10)
      @pagy, @fixtures = pagy(@q.includes(:market1_pre).where("market1_pres.status = ?", "Active"))
      respond_to do |format|
         format.html
         format.json {
            render json: {
              featured: render_to_string(partial: "feat_pre_match_fixture_table", locals: {featured: @featured}, formats: [:html]),
              fixtures: render_to_string(partial: "pre_match_fixture_table", locals: {fixtures: @fixtures}, formats: [:html]), pagination: view_context.pagy_nav(@pagy)
             }
         }
         format.js

      end

   end


   def featured    
       @check_params = false
      @q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND market1_pres.status = ?", "not_started", "6046", ["37364", "37386", "38301", "37814"], (Time.now), (Date.today.end_of_day + 1.days), "Active").order(start_date: :asc)

      @pagy, @featured = pagy(@q.includes(:market1_pre).where("market1_pres.status = ? AND fixtures.featured = ?", "Active", true))
     
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
