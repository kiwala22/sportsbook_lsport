class AddIndexToPreAndLiveMarkets < ActiveRecord::Migration[6.1]
  def change
    add_index :pre_markets, [:fixture_id, :market_identifier], unique: true
    add_index :live_markets, [:fixture_id, :market_identifier], unique: true
  end
end
