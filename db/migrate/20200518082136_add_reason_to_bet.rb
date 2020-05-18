class AddReasonToBet < ActiveRecord::Migration[6.0]
  def change
    add_column :bets, :reason, :string
  end
end
