class AddStatusToBroadcasts < ActiveRecord::Migration[6.1]
  def change
    add_column :broadcasts, :status, :string
  end
end
