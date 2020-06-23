class AddFixtureToMarket10Pre < ActiveRecord::Migration[6.0]
  def change
    add_reference :market10_pres, :fixture, null: false, foreign_key: true
  end
end
