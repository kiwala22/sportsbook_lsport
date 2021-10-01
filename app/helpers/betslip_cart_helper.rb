module BetslipCartHelper
   
   def fetch_market_status(market, identifier, fixture_id)
      status = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier).status
      return status
   end
   
   def fetch_current_odd(market, identifier, fixture_id, outcome)
      odd = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier).send(odds["outcome_#{outcome}"])
      return odd
   end
   
   def fetch_specifier(market, identifier, fixture_id)
      specifier = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier).odds["specifier"]
      return specifier
   end
   
end
