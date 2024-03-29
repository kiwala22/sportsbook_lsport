require 'sidekiq'

class CloseSettledBetsWorker
   include Sidekiq::Worker
   sidekiq_options queue: "high"
   sidekiq_options retry: false
   
   def perform(fixture_id, product, market_id, outcome, specifier)

      #Factors that could bring about bet being void
      void_factors = ["Cancelled", "Refund"]

      #find the fixture
      fixture = Fixture.find(fixture_id)
      bets = fixture.bets.where(product: product, market_identifier: market_id, status: "Active", specifier: specifier)
      # outcome = ActiveSupport::JSON.decode(outcome)
      winning_bets = outcome.select {|key, value| value == "Winner"}.keys
      
      ##Ensure the outcome is not blank
      if !outcome.blank?
         ##Check if the bet outcome contains anything from the void factors
         if !(void_factors & outcome.values).any?
            if bets
               bets.each do |bet|
                  if winning_bets.include?(bet.outcome)
                     bet.update(result: "Win", status: "Closed")
                  else
                     bet.update(result: "Loss", status: "Closed")
                  end
               end
            end
         else
            bets.each do |bet|
               bet.update(result: "Void", status: "Closed")
            end
         end
      end
   end
   
end