class CreateMarket63Pres < ActiveRecord::Migration[6.1]
  def change
    create_table :market63_pres do |t|
      t.string "event_id"
      t.decimal "outcome_1", precision: 8, scale: 2, default: "1.0"
      t.decimal "outcome_2", precision: 8, scale: 2, default: "1.0"
      t.string "status"
      t.string "void_reason"
      t.string "specifier"
      t.json "outcome"

      t.timestamps
    end
  end
end
