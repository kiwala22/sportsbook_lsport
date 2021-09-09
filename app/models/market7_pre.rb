class Market7Pre < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
   belongs_to :fixture

   after_commit :broadcast_updates, if: :persisted?


   def broadcast_updates
      # Find the corresponding fixture
      fixture = Fixture.find(self.fixture_id).as_json

      # Add necessary outcome fields to the fixture
      fixture['outcome_mkt7_12'] = self.outcome_12
      fixture['outcome_mkt7_1X'] = self.outcome_1X
      fixture['outcome_mkt7_X2'] = self.outcome_X2
      fixture["market_mkt7_status"] = self.status

      # Make the broadcasts
      CableWorker.perform_async("pre_odds_7_#{self.fixture_id}", fixture)
      CableWorker.perform_async("betslips_7_#{self.fixture_id}", fixture)
      
      if saved_change_to_status?
         # Add market status to the fixture object
         fixture["market_mkt7_status"] = self.status
         fixture["market"] = "7"

         #Make the broadcast
         CableWorker.perform_async("markets_#{self.fixture_id}", fixture)
      end
   end
end
