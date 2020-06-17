class CreateMarket29Pres < ActiveRecord::Migration[6.0]
  def change
    create_table :market29_pres do |t|
      t.string :event_id
      t.decimal :yes, precision: 6, scale: 2
      t.decimal :no, precision: 6, scale: 2
      t.string :status
      t.string :void_reason
      t.json :outcome
      t.timestamps
    end
  end
end
