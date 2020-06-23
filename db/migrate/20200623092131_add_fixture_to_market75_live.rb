class AddFixtureToMarket75Live < ActiveRecord::Migration[6.0]
  def change
    add_reference :market75_lives, :fixture, null: false, foreign_key: true
  end
end
