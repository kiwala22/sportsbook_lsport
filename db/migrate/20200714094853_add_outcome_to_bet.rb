class AddOutcomeToBet < ActiveRecord::Migration[6.0]
  def change
    add_reference :bets, :outcome, null: false, foreign_key: true
  end
end
