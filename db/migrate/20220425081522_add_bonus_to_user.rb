class AddBonusToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :bonus, :decimal, precision: 10, scale: 2, default: 0.0
  end
end
