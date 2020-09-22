class Market60Pre < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
   belongs_to :fixture

   after_save :broadcast_updates


   def broadcast_updates
      ActionCable.server.broadcast("pre_odds_60_#{self.fixture_id}", self)
      ActionCable.server.broadcast("betslips_60_#{self.fixture_id}", self)
      if saved_change_to_status?
         ActionCable.server.broadcast("markets_60_#{self.fixture_id}", self)
      end    
   end
end
