class AddFixtureToMarket3Live < ActiveRecord::Migration[6.0]
  def change
    add_reference :market3_lives, :fixture, null: false, foreign_key: true
  end
end
