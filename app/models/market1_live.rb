class Market1Live < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
   belongs_to :fixture
   
   after_commit :broadcast_updates, if: :persisted?
   
   
   def broadcast_updates
      # Find the corresponding fixture
      fixture = Fixture.find(self.fixture_id).as_json

      # Add necessary outcome fields to the fixture
      fixture['outcome_mkt1_1'] = self.outcome_1
      fixture['outcome_mkt1_X'] = self.outcome_X
      fixture['outcome_mkt1_2'] = self.outcome_2
      fixture["market_mkt1_status"] = self.status

      # Make the broadcasts
      CableWorker.perform_async("live_odds_1_#{self.fixture_id}", fixture)
      CableWorker.perform_async("betslips_1_#{self.fixture_id}", fixture)
      
      if saved_change_to_status?
         # Add market status to the fixture object
         fixture["market_mkt1_status"] = self.status

         #Make the broadcast
         CableWorker.perform_async("markets_#{self.fixture_id}", fixture)
      end
   end
   
end
