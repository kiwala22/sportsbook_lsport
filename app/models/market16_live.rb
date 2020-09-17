class Market16Live < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
   belongs_to :fixture
   after_save :broadcast_updates


   def broadcast_updates
      #RealtimePartialChannel.broadcast_to('fixtures', market: self)
      ActionCable.server.broadcast('live_odds', record: self)
      ActionCable.server.broadcast('betslips', record: self)
      if saved_change_to_status?
         ActionCable.server.broadcast('fixture', record: self)
      end
   end
end
