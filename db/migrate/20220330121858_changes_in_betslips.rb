class ChangesInBetslips < ActiveRecord::Migration[6.1]
  def change
    rename_column :bet_slips, :potential_win_amount, :payout
    add_column :bet_slips, :bonus, :decimal, :precision => 10, :scale => 2
    add_column :bet_slips, :tax, :decimal, :precision => 10, :scale => 2
  end
end
