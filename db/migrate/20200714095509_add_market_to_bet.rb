class AddMarketToBet < ActiveRecord::Migration[6.0]
  def change
    add_reference :bets, :market, null: false, foreign_key: true
  end
end
