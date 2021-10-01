class AddMarketIdentifierToLineBets < ActiveRecord::Migration[6.1]
  def change
    add_column :line_bets, :market_identifier, :string
  end
end
