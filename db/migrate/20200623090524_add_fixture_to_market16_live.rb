class AddFixtureToMarket16Live < ActiveRecord::Migration[6.0]
  def change
    add_reference :market16_lives, :fixture, null: false, foreign_key: true
  end
end
