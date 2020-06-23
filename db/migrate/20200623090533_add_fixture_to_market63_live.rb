class AddFixtureToMarket63Live < ActiveRecord::Migration[6.0]
  def change
    add_reference :market63_lives, :fixture, null: false, foreign_key: true
  end
end
