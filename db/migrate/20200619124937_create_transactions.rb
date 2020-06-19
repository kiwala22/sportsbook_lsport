class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.integer :user_id
      t.string :category
      t.integer :amount
      t.string :reference
      t.string :currency
      t.string :status
      
      t.timestamps
    end
  end
end
