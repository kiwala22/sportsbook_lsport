class AddAccountActiveToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :account_active, :boolean, default: true
  end
end
