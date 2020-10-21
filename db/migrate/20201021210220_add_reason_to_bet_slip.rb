class AddReasonToBetSlip < ActiveRecord::Migration[6.0]
  def change
    add_column :bet_slips, :reason, :string
  end
end
