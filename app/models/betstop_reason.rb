class BetstopReason < ApplicationRecord

   validates :description, presence: true
   validates :betstop_reason_id, presence: true
   validates :betstop_reason_id, uniqueness: true
end
