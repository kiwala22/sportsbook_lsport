class Cookies::BetSlipsController < ApplicationController
   protect_from_forgery except: :add_bet
   
   def add_bet
      if session[:bet_slip].blank?
         session[:bet_slip] = {}
      end

      outcome = bet_slips_params[:outcome_id]
      market = bet_slips_params[:market]
      fixture_id = bet_slips_params[:fixture_id].to_i

      
      fixture = Fixture.find(fixture_id)
      market_entry = market.constantize.find_by(fixture_id: fixture_id)

      if market_entry && market_entry.status == "Active"
         odd = market_entry.send(outcome)
         session[:bet_slip]["#{fixture.comp_one_abb}"] =  odd
         @betslips = session[:bet_slip]
      else
         #flash the error, market has been suspended or cancelled
      end

      #check the sessions if there is an existing fixture

      respond_to do |format|
         format.js
      end
   end
   
   private
   def bet_slips_params
      params.permit(:outcome_id, :market, :fixture_id)
   end
end
