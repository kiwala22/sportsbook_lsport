class Fixtures::Soccer::PreMatchController < ApplicationController
   include CurrentCart
   before_action :set_cart, only: [:index, :show]

   def index
      if Fixture.global_search(params[:q]).present?
        @q = Fixture.joins(:market1_pre).global_search(params[:q]).where("fixtures.status = ?  AND fixtures.scheduled_time >= ? ", "not_started",  Time.now).order(scheduled_time: :asc)
      elsif params[:q].present?
        @q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.category_id NOT IN (?) AND fixtures.scheduled_time >= ? AND fixtures.scheduled_time <= ?", "not_started", "sr:sport:1", ["sr:category:1033","sr:category:2123"], params[:q][:start], params[:q][:stop]).order(scheduled_time: :asc)
      elsif params[:leag].present?
        @q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.tournament_name = ?", "not_started", "sr:sport:1", params[:leag][:tournament_name]).order(scheduled_time: :asc)
      elsif params[:cty].present?
        @q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.category = ?", "not_started", "sr:sport:1", params[:cty][:category]).order(scheduled_time: :asc)
      else
        @q = Fixture.joins(:market1_pre).where("fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.category_id NOT IN (?) AND fixtures.scheduled_time >= ? AND fixtures.scheduled_time <= ?", "not_started", "sr:sport:1", ["sr:category:1033","sr:category:2123"], Time.now, Date.today.end_of_day).order(scheduled_time: :asc)
      end

      @pagy, @fixtures = pagy(@q.includes(:market1_pre) ,page: params[:page])
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
