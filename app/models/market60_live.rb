class Market60Live < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
   belongs_to :fixture

   after_save :broadcast_data


   def broadcast_data
      RealtimePartialChannel.broadcast_to('fixtures', market: self)
   end
end
