class AddPhoneNumberToTransactions < ActiveRecord::Migration[6.0]
  def change
    add_column :transactions, :phone_number, :string
  end
end
