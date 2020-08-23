class LineBetsController < ApplicationController
   include CurrentCart
   before_action :set_cart, only: [:create, :destroy, :refresh]
   # before_action :set_line_item, only: [:show, :edit, :update, :destroy]
   

   def create
      outcome = params[:outcome_id]
      market =  params[:market]
      fixture_id =  params[:fixture_id].to_i
      description = params[:outcome_desc]

      fixture = Fixture.find(fixture_id)
      market_entry = market.constantize.find_by(fixture_id: fixture_id)

      #check if the bet already exists
      @line_bet = LineBet.find_by(fixture_id: fixture.id, cart_id: @cart.id)
      if @line_bet
         @line_bet.assign_attributes(outcome: outcome, market: market, odd: market_entry.send("outcome_#{outcome}").to_f, description: description)
      else
         @line_bet = @cart.line_bets.build(fixture_id: fixture.id, outcome: outcome, market: market, odd: market_entry.send("outcome_#{outcome}").to_f, description: description)
      end

      respond_to do |format|
         if @line_bet.save
            format.js
         else
            format.js
         end
      end

   end

   def line_bet_delete
     @line_bet = LineBet.find(params[:id])
     @cart = Cart.find(@line_bet.cart_id)
     @line_bet.delete
     respond_to do |format|
       format.js
     end
   end

   def destroy
      @cart.destroy if @cart.id == session[:cart_id]
      session[:cart_id] = nil
      respond_to do |format|
         format.html { redirect_to root_url, notice: 'Your slip is now currently empty' }
      end
   end

   def refresh
      respond_to do |format|
         format.js
      end
   end
end
