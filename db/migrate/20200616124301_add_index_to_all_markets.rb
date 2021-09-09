class AddIndexToAllMarkets < ActiveRecord::Migration[6.0]
  def change
    add_index :market1_lives, :event_id
    add_index :market1_lives, :status
    add_index :market1_pres, :event_id
    add_index :market1_pres, :status
    add_index :market282_lives, :event_id
    add_index :market282_lives, :status
    add_index :market282_pres, :event_id
    add_index :market282_pres, :status
    add_index :market7_lives, :event_id
    add_index :market7_lives, :status
    add_index :market7_pres, :event_id
    add_index :market7_pres, :status
    add_index :market25_lives, :event_id
    add_index :market25_lives, :status
    add_index :market25_pres, :event_id
    add_index :market25_pres, :status
    add_index :market2_lives, :event_id
    add_index :market2_lives, :status
    add_index :market2_pres, :event_id
    add_index :market2_pres, :status
    add_index :market77_lives, :event_id
    add_index :market77_lives, :status
    add_index :market77_pres, :event_id
    add_index :market77_pres, :status
    add_index :market17_lives, :event_id
    add_index :market17_lives, :status
    add_index :market17_pres, :event_id
    add_index :market17_pres, :status
    add_index :market113_lives, :event_id
    add_index :market113_lives, :status
    add_index :market113_pres, :event_id
    add_index :market113_pres, :status
    add_index :market3_lives, :event_id
    add_index :market3_lives, :status
    add_index :market3_pres, :event_id
    add_index :market3_pres, :status
    add_index :market53_lives, :event_id
    add_index :market53_lives, :status
    add_index :market53_pres, :event_id
    add_index :market53_pres, :status
    add_index :market_alerts, :subscribed
    add_index :market_alerts, :timestamp
    add_index :market_alerts, :product


  end
end
