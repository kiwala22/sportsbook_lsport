class AddIdNumberToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :id_number, :string
  end
end
