class LiveMarket < ApplicationRecord
  belongs_to :fixture

  validates :market_identifier, presence: true
#   validates :market_identifier, uniqueness: true
  validates :fixture_id, presence: true
#   validates :fixture_id, uniqueness: true

  after_commit :broadcast_updates, if: :persisted?
   
   
  def broadcast_updates
    # Find the corresponding fixture
    fixture = Fixture.find(self.fixture_id).as_json

    if saved_change_to_odds?
      # Add necessary odds and status to the fixture
      fixture["market_#{self.market_identifier}_odds"] = self.odds
      fixture["market_#{self.market_identifier}_status"] = self.status

      # Make the broadcasts
      CableWorker.perform_async("live_odds_#{self.market_identifier}_#{self.fixture_id}", fixture)
      CableWorker.perform_async("betslips_#{self.market_identifier}_#{self.fixture_id}", fixture)
    end

    
    if saved_change_to_status?
       # Add market status to the fixture object
       fixture["market_#{self.market_identifier}_status"] = self.status

       # Specify which market
       fixture["market_identifier"] = self.market_identifier

       #Make the broadcast for market and betslip
       CableWorker.perform_async("betslips_#{self.market_identifier}_#{self.fixture_id}", fixture)
       CableWorker.perform_async("markets_#{self.market_identifier}_#{self.fixture_id}", fixture)
    end
 end
end
