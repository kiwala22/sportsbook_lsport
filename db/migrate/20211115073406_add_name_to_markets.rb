class AddNameToMarkets < ActiveRecord::Migration[6.1]
  def change
    add_column :pre_markets, :name, :string
    add_column :live_markets, :name, :string
  end
end
