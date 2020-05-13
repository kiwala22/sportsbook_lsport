class CreateMarket60Lives < ActiveRecord::Migration[6.0]
  def change
    create_table :market60_lives do |t|
      t.string :event_id
      t.decimal :competitor1, precision: 6, scale: 2
      t.decimal :draw, precision: 6, scale: 2
      t.decimal :competitor2, precision: 6, scale: 2
      t.string :status
      t.timestamps
    end
  end
end
