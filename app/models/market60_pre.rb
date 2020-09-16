class Market60Pre < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
   belongs_to :fixture

   after_save :broadcast_updates
   after_save :broadcast_refresh

   def broadcast_refresh
      if saved_change_to_status?
         RealtimePartialChannel.broadcast_to('fixtures', status: self)
      end
   end

   def broadcast_updates
      RealtimePartialChannel.broadcast_to('fixtures', market: self)
   end
end
