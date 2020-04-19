class CreateMatchStatuses < ActiveRecord::Migration[6.0]
  def change
    create_table :match_statuses do |t|
      t.integer :match_status_id
      t.string :description
      t.string :sports, array: true, default: []

      t.timestamps
    end
  end
end
