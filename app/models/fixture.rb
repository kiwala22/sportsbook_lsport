class Fixture < ApplicationRecord
  
  include PgSearch::Model
  
  pg_search_scope :global_search, 
  against: [:comp_one_name, :comp_two_name, :tournament_name, :category],
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
  
  after_update :broadcast_updates
  
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
  
  def broadcast_updates
    #check if change was on status
    if saved_change_to_attribute?(:status)
      if self.status == "postponed" || self.status == "cancelled"
        bets = self.bets
        bets.update_all(status: "Closed", result: "Void", reason: "Fixture #{self.status}")
      end
    end
    #check if match status is live and change was on either scores or match time
    if self.status == "live"
      if saved_change_to_attribute?(:home_score) || saved_change_to_attribute?(:away_score) || saved_change_to_attribute?(:match_time)
        ActionCable.server.broadcast('fixture', record: self)
      end
    end
  end
  
end