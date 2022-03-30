class CreateTopupBonuses < ActiveRecord::Migration[6.1]
  def change
    create_table :topup_bonuses do |t|
      t.decimal :amount,  precision: 10, scale: 2
      t.decimal :multiplier,  precision: 5, scale: 2
      t.string :status
      t.datetime :expiry

      t.timestamps
    end
  end
end
