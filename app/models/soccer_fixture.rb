class SoccerFixture < ApplicationRecord

   validates :event_id, presence: true
   validates :event_id, uniqueness: true

   include Betradar

   paginates_per 100

end
