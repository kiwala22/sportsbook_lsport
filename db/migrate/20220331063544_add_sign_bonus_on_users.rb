class AddSignBonusOnUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :activated_signup_bonus, :boolean, default: false
  end
end
