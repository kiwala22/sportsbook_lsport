class AddVoidFactorToBet < ActiveRecord::Migration[6.0]
  def change
    add_column :bets, :void_factor, :decimal, precision: 5, scale: 2
  end
end
