class MatchStatus < ApplicationRecord

   validates :description, presence: true
   validates :match_status_id, presence: true
   validates :match_status_id, uniqueness: true
end
