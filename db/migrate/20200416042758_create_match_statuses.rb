class CreateMatchStatuses < ActiveRecord::Migration[6.0]
  def change
    create_table :match_statuses do |t|
      t.integer :match_status_id, array: true, default: []
      t.string :description

      t.timestamps
    end
  end
end
