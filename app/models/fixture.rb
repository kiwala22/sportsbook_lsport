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
    "finished" => "finished",
    "cancelled" => "cancelled",
    "interrupted" => "interrupted",
    "postponed" => "postponed",
    "abandoned" => "Abandoned",
    "about to start" => "about to start",
    "coverage lost" => "coverage lost"

  }
  enum booking_status: {
    "Select one" => "",
    "True" => true,
    "False" => false
  }
  
  after_commit :broadcast_updates, if: :persisted?
  
  validates :event_id, presence: true
  validates :event_id, uniqueness: true

  has_many :pre_markets
  has_many :live_markets
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
        fixture = {"id": self.id}

        ## Add scores and match time to the fixture object
        fixture["home_score"] = self.home_score
        fixture["away_score"] = self.away_score
        fixture["match_time"] = self.match_time

        ## Broadcast the changes
        CableWorker.perform_async("fixtures_#{self.id}", fixture)
      end
    end
  end
  
end