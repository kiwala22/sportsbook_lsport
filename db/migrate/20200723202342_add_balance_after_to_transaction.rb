class AddBalanceAfterToTransaction < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :balance_after, :decimal, precision: 12, scale: 2
  end
end
