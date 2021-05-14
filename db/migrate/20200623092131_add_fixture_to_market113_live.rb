class AddFixtureToMarket113Live < ActiveRecord::Migration[6.0]
  def change
    add_reference :market113_lives, :fixture, null: false, foreign_key: true
  end
end
