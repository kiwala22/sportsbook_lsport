class CreateMarket29Lives < ActiveRecord::Migration[6.0]
  def change
    create_table :market29_lives do |t|
      t.string :event_id
      t.decimal :outcome_74, precision: 6, scale: 2
      t.decimal :outcome_76, precision: 6, scale: 2
      t.string :status
      t.string :void_reason
      t.json :outcome
      t.timestamps
    end
  end
end
