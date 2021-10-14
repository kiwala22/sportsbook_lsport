class AddSpecifierToLiveMarkets < ActiveRecord::Migration[6.1]
  def change
    add_column :live_markets, :specifier, :string
  end
end
