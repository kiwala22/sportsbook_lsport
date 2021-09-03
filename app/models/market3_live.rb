class Market3Live < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
   belongs_to :fixture
   after_commit :broadcast_updates, if: :persisted?


   def broadcast_updates
      # Find the corresponding fixture
      fixture = Fixture.find(self.fixture_id).as_json

      # Add necessary outcome fields to the fixture
      fixture['outcome_mkt3_1'] = self.outcome_1
      fixture['outcome_mkt3_2'] = self.outcome_2
      fixture["market_mkt3_status"] = self.status

      # Make the broadcasts
      CableWorker.perform_async("live_odds_3_#{self.fixture_id}", fixture)
      CableWorker.perform_async("betslips_3_#{self.fixture_id}", fixture)
      
      if saved_change_to_status?
         # Add market status to the fixture object
         fixture["market_mkt3_status"] = self.status
         fixture["market"] = "3"

         #Make the broadcast
         CableWorker.perform_async("markets_#{self.fixture_id}", fixture)
      end
   end
end
