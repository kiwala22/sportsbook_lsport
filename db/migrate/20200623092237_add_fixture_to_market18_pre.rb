class AddFixtureToMarket18Pre < ActiveRecord::Migration[6.0]
  def change
    add_reference :market18_pres, :fixture, null: false, foreign_key: true
  end
end
