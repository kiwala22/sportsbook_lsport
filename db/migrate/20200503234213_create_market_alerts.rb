class CreateMarketAlerts < ActiveRecord::Migration[6.0]
  def change
    create_table :market_alerts do |t|
      t.bigint :timestamp
      t.integer :product
      t.integer :subscribed

      t.timestamps
    end
  end
end
