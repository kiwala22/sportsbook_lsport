class Fixture < ApplicationRecord

   validates :event_id, presence: true
   validates :event_id, uniqueness: true

   include Betradar

end
