class AddFixtureToMarket66Pre < ActiveRecord::Migration[6.0]
  def change
    add_reference :market66_pres, :fixture, null: false, foreign_key: true
  end
end
