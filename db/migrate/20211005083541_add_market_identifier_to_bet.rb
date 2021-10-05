class AddMarketIdentifierToBet < ActiveRecord::Migration[6.1]
  def change
    add_column :bets, :market_identifier, :string
  end
end
