class CreateMarket53Pres < ActiveRecord::Migration[6.0]
  def change
    create_table :market53_pres do |t|
      t.string :event_id
      t.decimal :outcome_1, precision: 6, scale: 2
      t.decimal :outcome_2, precision: 6, scale: 2
      t.integer :hcp
      t.string :status
      t.string :void_reason
      t.json :outcome
      t.timestamps
    end
  end
end
