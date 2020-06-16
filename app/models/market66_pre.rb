class Market66Pre < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
end
