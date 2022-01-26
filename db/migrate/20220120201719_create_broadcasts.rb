class CreateBroadcasts < ActiveRecord::Migration[6.1]
  def change
    create_table :broadcasts do |t|
      t.string :promo
      t.integer :contacts
      t.string :message
      t.datetime :execution_time
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
