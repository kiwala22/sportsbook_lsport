require 'sidekiq'

class Soccer::CloseSettledBetsWorker
   include Sidekiq::Worker
   sidekiq_options queue: "high"
   sidekiq_options retry: false
   
   def perform(fixture_id, product, market_id, outcome)
      #find the fixture
      fixture = Fixture.find(fixture_id)
      bets = fixture.bets.where(product: product, market_id: market_id)
      outcome = ActiveSupport::JSON.decode(outcome)
      winning_bets = outcome.select {|key, value| value == "1"}.keys.map(&:to_i)
      
      if bets
         bets.each do |bet|
            if winning_bets.include?(bet.outcome_id)
               bet.update_attributes("Win")
            else
               bet.update_attributes("Loss")
            end
         end
      end
   end
   
end