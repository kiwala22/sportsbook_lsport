class AddIndexToAllMarkets < ActiveRecord::Migration[6.0]
  def change
    add_index :market1_lives, :event_id
    add_index :market1_lives, :status
    add_index :market1_pres, :event_id
    add_index :market1_pres, :status
    add_index :market60_lives, :event_id
    add_index :market60_lives, :status
    add_index :market60_pres, :event_id
    add_index :market60_pres, :status
    add_index :market10_lives, :event_id
    add_index :market10_lives, :status
    add_index :market10_pres, :event_id
    add_index :market10_pres, :status
    add_index :market63_lives, :event_id
    add_index :market63_lives, :status
    add_index :market63_pres, :event_id
    add_index :market63_pres, :status
    add_index :market18_lives, :event_id
    add_index :market18_lives, :status
    add_index :market18_pres, :event_id
    add_index :market18_pres, :status
    add_index :market68_lives, :event_id
    add_index :market68_lives, :status
    add_index :market68_pres, :event_id
    add_index :market68_pres, :status
    add_index :market29_lives, :event_id
    add_index :market29_lives, :status
    add_index :market29_pres, :event_id
    add_index :market29_pres, :status
    add_index :market75_lives, :event_id
    add_index :market75_lives, :status
    add_index :market75_pres, :event_id
    add_index :market75_pres, :status
    add_index :market16_lives, :event_id
    add_index :market16_lives, :status
    add_index :market16_pres, :event_id
    add_index :market16_pres, :status
    add_index :market66_lives, :event_id
    add_index :market66_lives, :status
    add_index :market66_pres, :event_id
    add_index :market66_pres, :status
    add_index :market_alerts, :subscribed
    add_index :market_alerts, :timestamp
    add_index :market_alerts, :product


  end
end
