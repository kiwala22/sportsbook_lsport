class AddCodeToBetSlipCancel < ActiveRecord::Migration[6.0]
  def change
    add_column :bet_slip_cancels, :code, :string
  end
end
