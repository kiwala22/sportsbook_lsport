class AddUserToDeposit < ActiveRecord::Migration[6.0]
  def change
    add_reference :deposits, :user, null: false, foreign_key: true
  end
end
