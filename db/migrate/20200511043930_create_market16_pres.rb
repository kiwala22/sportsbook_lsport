class CreateMarket16Pres < ActiveRecord::Migration[6.0]
  def change
    create_table :market16_pres do |t|
      t.string :event_id
      t.decimal :competitor1, precision: 6, scale: 2
      t.decimal :competitior2, precision: 6, scale: 2
      t.integer :threshold
      t.timestamps
    end
  end
end
