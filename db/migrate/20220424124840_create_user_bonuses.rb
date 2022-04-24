class CreateUserBonuses < ActiveRecord::Migration[6.1]
  def change
    create_table :user_bonuses do |t|
      t.references :user, null: false, foreign_key: true
      t.decimal :amount, precision: 10, scale: 2
      t.string :status

      t.timestamps
    end
  end
end
