class AddFixtureToBet < ActiveRecord::Migration[6.0]
  def change
    add_reference :bets, :fixture, null: false, foreign_key: true
  end
end
