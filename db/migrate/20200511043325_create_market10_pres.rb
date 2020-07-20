class CreateMarket10Pres < ActiveRecord::Migration[6.0]
  def change
    create_table :market10_pres do |t|
      t.string :event_id
      t.decimal :outcome_9, precision: 6, scale: 2
      t.decimal :outcome_10, precision: 6, scale: 2
      t.decimal :outcome_11, precision: 6, scale: 2
      t.string :status
      t.string :void_reason
      t.json :outcome
      t.timestamps
    end
  end
end
