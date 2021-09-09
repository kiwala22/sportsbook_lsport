class AddFixtureToMarket7Live < ActiveRecord::Migration[6.0]
  def change
    add_reference :market7_lives, :fixture, null: false, foreign_key: true
  end
end
