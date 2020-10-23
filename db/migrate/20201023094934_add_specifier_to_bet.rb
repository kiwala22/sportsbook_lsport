class AddSpecifierToBet < ActiveRecord::Migration[6.0]
  def change
    add_column :bets, :specifier, :string
  end
end
