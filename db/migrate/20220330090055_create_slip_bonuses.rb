class CreateSlipBonuses < ActiveRecord::Migration[6.1]
  def change
    create_table :slip_bonuses do |t|
      t.decimal :multiplier,  precision: 5, scale: 2
      t.decimal :min_accumulator
      t.decimal :max_accumulator
      t.string :status
      t.datetime :expiry

      t.timestamps
    end
  end
end
