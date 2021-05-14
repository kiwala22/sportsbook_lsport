class AddFixtureToMarket282Pre < ActiveRecord::Migration[6.0]
  def change
    add_reference :market282_pres, :fixture, null: false, foreign_key: true
  end
end
