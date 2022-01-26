class RenameUserToAdminInBroadcast < ActiveRecord::Migration[6.1]
  def change
    rename_column :broadcasts, :user_id, :admin_id
  end
end
