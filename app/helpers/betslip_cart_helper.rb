module BetslipCartHelper

   def fetch_market_status(market, fixture_id)
      status = market.constantize.find_by(fixture_id: fixture_id).status
      return status
   end

   def fetch_current_odd(market, fixture_id, outcome)
      odd = market.constantize.find_by(fixture_id: fixture_id).send(outcome)
      return odd
   end
end