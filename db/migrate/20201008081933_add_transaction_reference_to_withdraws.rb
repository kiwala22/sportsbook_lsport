class AddTransactionReferenceToWithdraws < ActiveRecord::Migration[6.0]
  def change
    add_column :withdraws, :transaction_reference, :string
  end
end
