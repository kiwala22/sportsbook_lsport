class AddResultToBetSlip < ActiveRecord::Migration[6.0]
  def change
    add_column :bet_slips, :result, :string
  end
end
