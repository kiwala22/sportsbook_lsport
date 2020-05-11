class CreateMarket68Pres < ActiveRecord::Migration[6.0]
  def change
    create_table :market68_pres do |t|
      t.string :event_id
      t.decimal :under, precision: 6, scale: 2
      t.decimal :over, precision: 6, scale: 2

      t.timestamps
    end
  end
end
