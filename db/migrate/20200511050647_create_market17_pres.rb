class CreateMarket17Pres < ActiveRecord::Migration[6.0]
  def change
    create_table :market17_pres do |t|
      t.string :event_id
      t.decimal :outcome_Yes, precision: 6, scale: 2
      t.decimal :outcome_No, precision: 6, scale: 2
      t.string :status
      t.string :void_reason
      t.json :outcome
      t.timestamps
    end
  end
end