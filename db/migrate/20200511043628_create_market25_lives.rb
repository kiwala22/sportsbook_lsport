class CreateMarket25Lives < ActiveRecord::Migration[6.0]
  def change
    create_table :market25_lives do |t|
      t.string :event_id
      t.decimal :outcome_12, precision: 6, scale: 2
      t.decimal :outcome_1X, precision: 6, scale: 2
      t.decimal :outcome_X2, precision: 6, scale: 2
      t.string :status
      t.string :void_reason
      t.json :outcome
      t.timestamps
    end
  end
end
