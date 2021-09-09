class CreateRecoveryRequests < ActiveRecord::Migration[6.0]
  def change
    create_table :recovery_requests do |t|
      t.string :product
      t.string :timestamp

      t.timestamps
    end
  end
end
