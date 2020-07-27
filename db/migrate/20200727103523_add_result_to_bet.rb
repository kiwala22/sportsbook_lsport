class AddResultToBet < ActiveRecord::Migration[6.0]
  def change
    add_column :bets, :result, :string
  end
end
