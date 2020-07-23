class AddBalanceBeforeToTransaction < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :balance_before, :decimal, precision: 12, scale: 2
  end
end
