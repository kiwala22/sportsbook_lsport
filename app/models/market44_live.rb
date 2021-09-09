class Market44Live < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
   belongs_to :fixture

   after_commit :broadcast_updates, if: :persisted?


   def broadcast_updates
      CableWorker.perform_async("live_odds_44_#{self.fixture_id}", self.as_json)
      CableWorker.perform_async("betslips_44_#{self.fixture_id}", self.as_json)
      
      if saved_change_to_status?
         CableWorker.perform_async("markets_#{self.fixture_id}", self.as_json)
      end
   end
end
