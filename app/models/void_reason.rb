class VoidReason < ApplicationRecord

   validates :description, presence: true
   validates :void_reason_id, presence: true
   validates :void_reason_id, uniqueness: true
end
