class AddProductToBet < ActiveRecord::Migration[6.0]
  def change
    add_column :bets, :product, :string
  end
end
