class Fixture < ApplicationRecord
  
  include PgSearch::Model
  
  pg_search_scope :global_search, 
  against: [:part_one_name, :part_two_name, :league_name, :location],
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
  
  after_commit :broadcast_updates, if: :persisted?
  
  validates :event_id, presence: true
  validates :event_id, uniqueness: true
  
  has_one :market1_live
  has_one :market7_live
  has_one :market3_live
  has_one :market2_live
  has_one :market17_live
  has_one :market282_live
  has_one :market25_live
  has_one :market53_live
  has_one :market77_live
  has_one :market113_live
  has_one :market52_live
  has_one :market63_live
  has_one :market28_live
  has_one :market41_live
  has_one :market42_live
  has_one :market43_live
  has_one :market44_live
  has_one :market49_live
  
  has_one :market1_pre
  has_one :market7_pre
  has_one :market3_pre
  has_one :market2_pre
  has_one :market17_pre
  has_one :market282_pre
  has_one :market25_pre
  has_one :market53_pre
  has_one :market77_pre
  has_one :market113_pre
  has_one :market52_pre
  has_one :market63_pre
  has_one :market28_pre
  has_one :market41_pre
  has_one :market42_pre
  has_one :market43_pre
  has_one :market44_pre
  has_one :market49_pre
  
  has_many :bets
  
  
  
  include Lsports
  
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
        CableWorker.perform_async("fixtures_#{self.id}", self.as_json)
      end
    end
  end
  
end