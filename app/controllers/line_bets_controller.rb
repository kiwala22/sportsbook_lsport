class LineBetsController < ApplicationController
  protect_from_forgery except: %i[refresh line_bet_delete create destroy]
  include CurrentCart
  include BetslipCartHelper
  before_action :set_cart,
                only: %i[
                  create
                  destroy
                  refresh
                  close_betslip_button_display
                  cart_fixtures
                ]

  # before_action :set_line_item, only: [:show, :edit, :update, :destroy]

  def create
    outcome = params[:outcome_id]
    market = params[:market]
    fixture_id = params[:fixture_id].to_i
    description = params[:outcome_desc]

    fixture = Fixture.find(fixture_id)
    market_entry = market.constantize.find_by(fixture_id: fixture_id)

    #check if the bet already exists
    @line_bet = LineBet.find_by(fixture_id: fixture.id, cart_id: @cart.id)
    if @line_bet
      @line_bet.assign_attributes(
        outcome: outcome,
        market: market,
        odd: market_entry.send("outcome_#{outcome}").to_f,
        description: description
      )
    else
      @line_bet =
        @cart.line_bets.build(
          fixture_id: fixture.id,
          outcome: outcome,
          market: market,
          odd: market_entry.send("outcome_#{outcome}").to_f,
          description: description
        )
    end

    respond_to { |format| @line_bet.save ? format.js : format.js }
  end

  def line_bet_delete
    @line_bet = LineBet.find(params[:id])
    @cart = Cart.find(@line_bet.cart_id)
    @line_bet.delete

    #   respond_to do |format|
    #     format.js
    #   end
    render json: { 'status': 'OK' }
  end

  def cart_fixtures
    @games = @cart.line_bets
    fixtures = []
    @games.each do |bet|
      if fetch_market_status(bet.market, bet.fixture_id) == 'Active'
        fixtures << {
          'fixtureId': bet.fixture_id,
          'partOne': bet.fixture.part_one_name,
          'partTwo': bet.fixture.part_two_name,
          'id': bet.id,
          'market': bet.market,
          'description': bet.description,
          'outcome': bet.outcome,
          'odd': fetch_current_odd(bet.market, bet.fixture_id, bet.outcome)
        }
      end
    end

    render json: fixtures
  end

  def destroy
    @cart.destroy if @cart.id == session[:cart_id]
    session[:cart_id] = nil

    # respond_to do |format|
    #    format.html {
    #       flash[:notice] = "Your slip is now currently empty"
    # 	   redirect_back(fallback_location: root_path)
    #    }
    # end
    render json: { 'status': 'OK' }
  end

  def refresh
    respond_to { |format| format.js }
  end

  def close_betslip_button_display
    games_on_slip = @cart.line_bets.count

    respond_to do |format|
      format.json { render json: { games: games_on_slip } }
    end
  end
end
