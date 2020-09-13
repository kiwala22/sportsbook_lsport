class Market66Live < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
   belongs_to :fixture

   after_save :broadcast_updates


   def broadcast_updates
      RealtimePartialChannel.broadcast_to('fixtures', market: self)
   end
end
