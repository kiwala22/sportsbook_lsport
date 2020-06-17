class CreateMarket66Lives < ActiveRecord::Migration[6.0]
  def change
    create_table :market66_lives do |t|
      t.string :event_id
      t.decimal :competitor1, precision: 6, scale: 2
      t.decimal :competitor2, precision: 6, scale: 2
      t.integer :threshold
      t.string :status
      t.string :void_reason
      t.json :outcome
      t.timestamps
    end
  end
end
