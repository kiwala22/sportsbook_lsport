class CreateMarkets < ActiveRecord::Migration[6.0]
  def change
    create_table :markets do |t|
      t.integer :market_id
      t.string :description

      t.timestamps
    end
  end
end
