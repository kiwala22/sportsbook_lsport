class CreateMarket10Lives < ActiveRecord::Migration[6.0]
  def change
    create_table :market10_lives do |t|
      t.string :event_id
      t.decimal :competitor1_draw, precision: 6, scale: 2
      t.decimal :competitor1_competitor2, precision: 6, scale: 2
      t.decimal :draw_competitor2, precision: 6, scale: 2
      t.string :status
      t.string :void_reason
      t.json :outcome
      t.timestamps
    end
  end
end
