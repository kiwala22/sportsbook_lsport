class AddFixtureToMarket18Live < ActiveRecord::Migration[6.0]
  def change
    add_reference :market18_lives, :fixture, null: false, foreign_key: true
  end
end
