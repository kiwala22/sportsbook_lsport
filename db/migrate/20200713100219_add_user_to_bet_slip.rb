class AddUserToBetSlip < ActiveRecord::Migration[6.0]
  def change
    add_reference :bet_slips, :user, null: false, foreign_key: true
  end
end
