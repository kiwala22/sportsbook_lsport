class CreateBets < ActiveRecord::Migration[6.0]
  def change
    create_table :bets do |t|
      t.string :event
      t.string :sport
      t.string :type
      t.decimal :odds, precision: 5, scale: 2
      t.string :status
      t.string :product
      t.string :reason

      t.timestamps
    end
  end
end
