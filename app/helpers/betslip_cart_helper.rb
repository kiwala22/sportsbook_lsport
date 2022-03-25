module BetslipCartHelper
   
   def fetch_market_status(market, identifier, fixture_id, specifier = nil)
      market = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier, specifier: specifier)
      status = market.nil? ? nil : market.status
      return status
   end
   
   def fetch_current_odd(market, identifier, fixture_id, outcome, specifier = nil)
      oddValue = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier, specifier: specifier)
      oddValue = oddValue.nil? ? 1.0 : oddValue.send("odds")["outcome_#{outcome}"]
      return oddValue.to_f.round(2)
   end
   
   def fetch_specifier(market, identifier, fixture_id)
      market = market.constantize.find_by(fixture_id: fixture_id, market_identifier: identifier)
      specifier = market.nil? ? nil : market.specifier
      return specifier
   end
   
end
