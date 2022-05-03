class AddIndexOnSpecifierToPreAndLiveMarkets < ActiveRecord::Migration[6.1]
  def change
    add_index :pre_markets, :specifier, unique: true
    add_index :live_markets, :specifier, unique: true
  end
end
