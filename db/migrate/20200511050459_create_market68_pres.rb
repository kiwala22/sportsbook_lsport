class CreateMarket68Pres < ActiveRecord::Migration[6.0]
  def change
    create_table :market68_pres do |t|
      t.string :event_id
      t.decimal :outcome_12, precision: 6, scale: 2
      t.decimal :outcome_13, precision: 6, scale: 2
      t.string :status
      t.decimal :total, precision: 5, scale: 2
      t.string :void_reason
      t.json :outcome
      t.timestamps
    end
  end
end
