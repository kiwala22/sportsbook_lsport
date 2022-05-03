class PreMarket < ApplicationRecord
  
  belongs_to :fixture

  validates :market_identifier, presence: true
#   validates :market_identifier, uniqueness: true
  validates :fixture_id, presence: true
#   validates :fixture_id, uniqueness: true

  after_commit :broadcast_updates, if: :persisted?
   
   
   def broadcast_updates
      ## Create a fixture replica object
      # fixture = {"id": self.fixture_id}

      if saved_change_to_odds?
        # Add necessary odds and status to the fixture
        # fixture["market_#{self.market_identifier}_odds"] = self.odds
        # fixture["market_#{self.market_identifier}_status"] = self.status
        
        # # Specify which market
        # fixture["market_identifier"] = self.market_identifier

        # Make the broadcasts
        ActionCable.server.broadcast("pre_odds_#{self.market_identifier}_#{self.fixture_id}", self.as_json)
        ActionCable.server.broadcast("betslips_#{self.market_identifier}_#{self.fixture_id}", self.as_json)
        # CableWorker.perform_async("pre_odds_#{self.market_identifier}_#{self.fixture_id}", self.as_json)
        # CableWorker.perform_async("betslips_#{self.market_identifier}_#{self.fixture_id}", self.as_json)
      end
      
      if saved_change_to_status?
         # Add market status to the fixture object
        #  fixture["market_#{self.market_identifier}_status"] = self.status

        #  # Specify which market
        #  fixture["market_identifier"] = self.market_identifier

         #Make the broadcast for market and betslip
         ActionCable.server.broadcast("betslips_#{self.market_identifier}_#{self.fixture_id}", self.as_json)
         ActionCable.server.broadcast("markets_#{self.market_identifier}_#{self.fixture_id}", self.as_json)
        #  CableWorker.perform_async("betslips_#{self.market_identifier}_#{self.fixture_id}", self.as_json)
        #  CableWorker.perform_async("markets_#{self.market_identifier}_#{self.fixture_id}", self.as_json)
      end
   end
end
