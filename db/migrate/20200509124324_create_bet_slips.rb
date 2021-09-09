class CreateBetSlips < ActiveRecord::Migration[6.0]
  def change
    create_table :bet_slips do |t|
      t.integer :bet_count
      t.decimal :stake, precision: 12, scale: 2
      t.decimal :win_amount, precision: 12, scale: 2
      t.decimal :odds, precision: 10, scale: 2
      t.decimal :potential_win_amount, precision: 12, scale: 2
      t.string :status
      t.boolean :paid

      t.timestamps
    end
  end
end
