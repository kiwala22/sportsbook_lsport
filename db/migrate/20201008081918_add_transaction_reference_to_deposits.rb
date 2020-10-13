class AddTransactionReferenceToDeposits < ActiveRecord::Migration[6.0]
  def change
    add_column :deposits, :transaction_reference, :string
  end
end
