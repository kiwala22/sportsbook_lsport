class CreateBettingStatuses < ActiveRecord::Migration[6.0]
  def change
    create_table :betting_statuses do |t|
      t.integer :betting_status_id
      t.string :description

      t.timestamps
    end
  end
end
