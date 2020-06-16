class Market66Live < ApplicationRecord
   validates :event_id, presence: true
   validates :event_id, uniqueness: true
   
end
