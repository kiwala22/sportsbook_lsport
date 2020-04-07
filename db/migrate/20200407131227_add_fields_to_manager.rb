class AddFieldsToManager < ActiveRecord::Migration[6.0]
  def change
    add_column :managers, :first_name, :string
    add_column :managers, :last_name, :string
  end
end
