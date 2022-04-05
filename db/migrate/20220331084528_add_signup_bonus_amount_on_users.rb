class AddSignupBonusAmountOnUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :signup_bonus_amount, :decimal, :precision => 10, :scale => 2, :default => 0.0
  end
end
