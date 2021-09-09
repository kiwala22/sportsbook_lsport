class BettingStatus < ApplicationRecord

   validates :description, presence: true
   validates :betting_status_id, presence: true
   validates :betting_status_id, uniqueness: true
end
