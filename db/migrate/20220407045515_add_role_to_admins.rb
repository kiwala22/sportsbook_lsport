class AddRoleToAdmins < ActiveRecord::Migration[6.1]
  def change
    add_column :admins, :role, :string, :default => "support"
  end
end
