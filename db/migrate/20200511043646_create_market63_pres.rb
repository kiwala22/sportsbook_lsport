class CreateMarket63Pres < ActiveRecord::Migration[6.0]
  def change
    create_table :market63_pres do |t|
      t.string :event_id
      t.decimal :competitor1_draw, precision: 6, scale: 2
      t.decimal :competitior1_competitior2, precision: 6, scale: 2
      t.decimal :draw_competitor2, precision: 6, scale: 2

      t.timestamps
    end
  end
end
