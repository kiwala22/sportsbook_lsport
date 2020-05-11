class AddStatusToMarketAlert < ActiveRecord::Migration[6.0]
  def change
    add_column :market_alerts, :status, :boolean, :default => false
    #Ex:- :default =>''
  end
end
