require 'sidekiq'

class Soccer::RollbackSettledBetsWorker
   include Sidekiq::Worker
   sidekiq_options queue: "high"
   sidekiq_options retry: false
   
   def perform(fixture_id, product, market_id)
      #find the fixture
      fixture = Fixture.find(fixture_id)
      bets = fixture.bets.where(product: product, market_id: market_id, result: ["Win", "Loss"])
      
      if bets
         bets.each do |bet|
            bet.update(status: "Active")
         end
      end
   end
   
end