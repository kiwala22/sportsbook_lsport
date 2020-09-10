class AddDefaultsWinAmountAndPaidOnBetslips < ActiveRecord::Migration[6.0]
  def change
    change_column_default :bet_slips, :win_amount, 0
    change_column_default :bet_slips, :paid, false
  end
end
