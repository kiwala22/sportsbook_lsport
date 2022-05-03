class EditIndexesOnPreAndLiveMarkets < ActiveRecord::Migration[6.1]
  def change
    remove_index :pre_markets, [:fixture_id, :market_identifier], unique: true
    remove_index :live_markets, [:fixture_id, :market_identifier], unique: true
    remove_index :pre_markets, :specifier, unique: true
    remove_index :live_markets, :specifier, unique: true
    add_index :pre_markets, [:fixture_id, :market_identifier, :specifier], unique: true, name: "custom_index_on_pre_markets"
    add_index :live_markets, [:fixture_id, :market_identifier, :specifier], unique: true, name: "custom_index_on_live_markets"
  end
end
