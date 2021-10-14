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
    outcome = params[:outcome_id] ## Ex: "X"
    market = params[:market] ## Ex: PreMarket or LiveMarket
    identifier = params[:identifier] ## Ex: "1"
    fixture_id = params[:fixture_id].to_i ## Ex: 1090
    description = params[:outcome_desc] ## Ex: "1X2 FT - 2"

    fixture = Fixture.find(fixture_id)

    if params[:specifier].present?
      market_entry = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier, specifier: params[:specifier])
    else
      market_entry = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier)
    end

    #check if the bet already exists
    @line_bet = LineBet.find_by(fixture_id: fixture.id, cart_id: @cart.id)
    if @line_bet
      @line_bet.assign_attributes(
        outcome: outcome,
        market: market,
        market_identifier: identifier,
        odd: market_entry.send("odds")["outcome_#{outcome}"].to_f.round(2),
        description: description,
        specifier: params[:specifier]
      )
    else
      @line_bet =
        @cart.line_bets.build(
          fixture_id: fixture.id,
          outcome: outcome,
          market: market,
          market_identifier: identifier,
          odd: market_entry.send("odds")["outcome_#{outcome}"].to_f.round(2),
          description: description,
          specifier: params[:specifier]
        )
    end

    ## After adding the line_bet to cart, send all line_bets in cart to react state
    if @line_bet.save 
      cart_fixtures() && return
    end

  end

  def line_bet_delete
    @line_bet = LineBet.find(params[:id])
    @cart = Cart.find(@line_bet.cart_id)
    @line_bet.delete

    render json: { 'status': 'OK' }
  end

  def cart_fixtures
    @games = @cart.line_bets
    fixtures = []
    @games.each do |bet|
      if fetch_market_status(bet.market, bet.market_identifier, bet.fixture_id, bet.specifier) == 'Active'
        fixtures << {
          'cartId': bet.cart_id,
          'fixtureId': bet.fixture_id,
          'partOne': bet.fixture.part_one_name,
          'partTwo': bet.fixture.part_two_name,
          'id': bet.id,
          'market': bet.market,
          'marketIdentifier': bet.market_identifier,
          'description': bet.description,
          'outcome': bet.outcome,
          'odd': fetch_current_odd(bet.market, bet.market_identifier, bet.fixture_id, bet.outcome, bet.specifier),
          "market_#{bet.market_identifier}_status": "Active"
        }
      end
    end

    render json: fixtures
  end

  def destroy
    @cart.destroy if @cart.id == session[:cart_id]
    session[:cart_id] = nil
    render json: { 'status': 'OK' }
  end

end
