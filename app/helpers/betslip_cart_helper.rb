module BetslipCartHelper
   
   def fetch_market_status(market, identifier, fixture_id, specifier = nil)
      status = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier, specifier: specifier).status
      return status
   end
   
   def fetch_current_odd(market, identifier, fixture_id, outcome, specifier = nil)
      oddValue = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier, specifier: specifier)
      oddValue = oddValue.nil? ? 1.0 : oddValue.send("odds")["outcome_#{outcome}"]
      return oddValue.to_f.round(2)
   end
   
   def fetch_specifier(market, identifier, fixture_id)
      specifier = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier).specifier
      return specifier
   end
   
end
