class Fixture < ApplicationRecord

   include PgSearch::Model

   pg_search_scope :global_search, 
   against: [:comp_one_name, :comp_two_name, :tournament_name],
    using:{ 
      tsearch: {prefix: true}
    }

  enum fixture_status: {
    "Select One" => "",
    "not_started" => "not_started",
    "live" => "live",
    "suspended" => "suspended",
    "ended" => "ended",
    "closed" => "closed",
    "cancelled" => "cancelled",
    "delayed" => "delayed",
    "interrupted" => "interrupted",
    "postponed" => "postponed",
    "abandoned" => "abandoned"
  }

  enum booking_status: {
    "Select one" => "",
    "True" => true,
    "False" => false
  }

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

   has_many :bets



   include Betradar

   paginates_per 100

end
