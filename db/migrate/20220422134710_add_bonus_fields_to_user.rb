class AddBonusFieldsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :activated_first_deposit_bonus, :boolean, :default => false
    add_column :users, :first_deposit_bonus_amount, :decimal, :precision => 10, :scale => 2, :default => 0.0
  end
end
