class AddFixtureToMarket60Live < ActiveRecord::Migration[6.0]
  def change
    add_reference :market60_lives, :fixture, null: false, foreign_key: true
  end
end
