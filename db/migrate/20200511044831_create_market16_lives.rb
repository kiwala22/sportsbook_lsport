class CreateMarket16Lives < ActiveRecord::Migration[6.0]
  def change
    create_table :market16_lives do |t|
      t.string :event_id
      t.decimal :competitor1, precision: 6, scale: 2
      t.decimal :competitior2, precision: 6, scale: 2
      t.integer :threshold
      t.string :status
      t.timestamps
    end
  end
end