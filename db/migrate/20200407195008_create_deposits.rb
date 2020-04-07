class CreateDeposits < ActiveRecord::Migration[6.0]
  def change
    create_table :deposits do |t|
      t.decimal :amount, precision: 12, scale: 2
      t.string :network
      t.string :payment_method
      t.decimal :balance_before, precision: 12, scale: 2
      t.decimal :balance_after, precision: 12, scale: 2
      t.string :ext_transaction_id
      t.string :transaction_id
      t.string :resource_id
      t.string :receiving_fri
      t.string :status
      t.string :message
      t.string :currency
      t.string :phone_number

      t.timestamps
    end
    add_index :deposits, :ext_transaction_id, unique: true
    add_index :deposits, :transaction_id, unique: true
    add_index :deposits, :resource_id, unique: true
    add_index :deposits, :phone_number
  end
end
