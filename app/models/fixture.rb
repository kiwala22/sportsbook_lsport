class Fixture < ApplicationRecord

   validates :event_id, presence: true
   validates :event_id, uniqueness: true

   has_one :market1_live
   has_one :market10_live
   has_one :market16_live
   has_one :market18_live
   has_one :market29_live
   has_one :market60_live
   has_one :market63_live
   has_one :market66_live
   has_one :market68_live
   has_one :market75_live

   has_one :market1_pre
   has_one :market10_pre
   has_one :market16_pre
   has_one :market18_pre
   has_one :market29_pre
   has_one :market60_pre
   has_one :market63_pre
   has_one :market66_pre
   has_one :market68_pre
   has_one :market75_pre
   


   include Betradar

   paginates_per 100

end
