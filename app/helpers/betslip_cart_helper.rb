module BetslipCartHelper
   
   def fetch_market_status(market, identifier, fixture_id, specifier: nil)
      status = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier, specifier: specifier).status
      return status
   end
   
   def fetch_current_odd(market, identifier, fixture_id, outcome, specifier: nil)
      odd = 1.0
      oddValue = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier, specifier: specifier).send("odds")["outcome_#{outcome}"]
      odd = oddValue.to_f.round(2) unless oddValue.nil?
      return odd
   end
   
   def fetch_specifier(market, identifier, fixture_id)
      specifier = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier).specifier
      return specifier
   end
   
end
