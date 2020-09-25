class Market10Live < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
   belongs_to :fixture

   after_commit :broadcast_updates, if: :persisted?


   def broadcast_updates
      CableWorker.perform_async("live_odds_10_#{self.fixture_id}", self)
      CableWorker.perform_async("betslips_10_#{self.fixture_id}", self)
      
      if saved_change_to_status?
         CableWorker.perform_async("markets_#{self.fixture_id}", self)
      end
   end
end
