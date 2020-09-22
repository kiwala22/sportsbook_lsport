class Market1Pre < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
   belongs_to :fixture
   after_save :broadcast_updates


   def broadcast_updates
      ActionCable.server.broadcast('pre_odds', record: self)
      ActionCable.server.broadcast('betslips', record: self)
      if saved_change_to_status?
         ActionCable.server.broadcast('markets', record: self)
      end
   end
end
