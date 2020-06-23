class AddFixtureToMarket60Pre < ActiveRecord::Migration[6.0]
  def change
    add_reference :market60_pres, :fixture, null: false, foreign_key: true
  end
end
