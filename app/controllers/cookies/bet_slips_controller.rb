class Cookies::BetSlipsController < ApplicationController
   
   
   def create
      outcome = bet_slips_params[:outcome_id]
      market = bet_slips_params[:market]
      fixture = bet_slips_params[:fixture_id]
      
      #check the sessions if there is an existing fixture

      #if not add to the cookie the fixture with the fetch odd and recaculate the total odd


      respond_to do |format|
         format.js
      end
   end
   
   private
   def bet_slips_params
      params.permit(:outcome_id, :market, :fixture_id)
   end
end
