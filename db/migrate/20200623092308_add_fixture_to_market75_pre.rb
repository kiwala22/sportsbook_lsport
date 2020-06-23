class AddFixtureToMarket75Pre < ActiveRecord::Migration[6.0]
  def change
    add_reference :market75_pres, :fixture, null: false, foreign_key: true
  end
end
