class AddSpecifierToPreMarkets < ActiveRecord::Migration[6.1]
  def change
    add_column :pre_markets, :specifier, :string
  end
end
