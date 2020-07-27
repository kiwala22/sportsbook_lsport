require 'sidekiq'

class Soccer::CloseSettledBetsWorker
   include Sidekiq::Worker
   sidekiq_options queue: "high"
   sidekiq_options retry: false
   
   def perform(fixture_id, product, market_id, outcome)
      #find the fixture
      fixture = Fixture.find(fixture_id)
      bets = fixture.bets.where(product: product, market_id: market_id, status: "Active")
      outcome = ActiveSupport::JSON.decode(outcome)
      winning_bets = outcome.select {|key, value| value == "1"}.keys.map(&:to_i)
      
      if bets
         bets.each do |bet|
            if winning_bets.include?(bet.outcome_id)
               bet.update_attributes(result: "Win", status: "Closed")
            else
               bet.update_attributes(result: "Loss", status: "Closed")
            end
         end
      end
   end
   
end