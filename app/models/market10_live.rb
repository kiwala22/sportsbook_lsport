class Market10Live < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
   belongs_to :fixture

   after_save :broadcast_updates


   def broadcast_updates
      ActionCable.server.broadcast("live_odds_10_#{self.fixture_id}", self)
      ActionCable.server.broadcast("betslips_10_#{self.fixture_id}", self)
      if saved_change_to_status?
         ActionCable.server.broadcast("markets_#{self.fixture_id}", self)
      end
   end
end
