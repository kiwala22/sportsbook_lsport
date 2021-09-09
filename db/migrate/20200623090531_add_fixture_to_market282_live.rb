class AddFixtureToMarket282Live < ActiveRecord::Migration[6.0]
  def change
    add_reference :market282_lives, :fixture, null: false, foreign_key: true
  end
end
