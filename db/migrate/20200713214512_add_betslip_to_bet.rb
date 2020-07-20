class AddBetslipToBet < ActiveRecord::Migration[6.0]
  def change
    add_reference :bets, :bet_slip, null: false, foreign_key: true
  end
end
