class AddPasswordResetCodeToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :password_reset_code, :integer
    add_column :users, :password_reset_sent_at, :datetime
  end
end
