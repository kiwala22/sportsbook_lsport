class RemoveMarketFromBet < ActiveRecord::Migration[6.1]
  def change
    remove_column :bets, :market_id
  end
end
