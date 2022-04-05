class CreateSignUpBonuses < ActiveRecord::Migration[6.1]
  def change
    create_table :sign_up_bonuses do |t|
      t.decimal :amount,  precision: 10, scale: 2
      t.string :status
      t.datetime :expiry

      t.timestamps
    end
  end
end
