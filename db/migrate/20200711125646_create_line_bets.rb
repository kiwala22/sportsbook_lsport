class CreateLineBets < ActiveRecord::Migration[6.0]
  def change
    create_table :line_bets do |t|
      t.references :cart, null: false, foreign_key: true
      t.references :fixture, null: false, foreign_key: true
      t.decimal :odd, precision: 5, scale: 2
      t.string :description
      t.string :market
      t.string :outcome

      t.timestamps
    end
  end
end
