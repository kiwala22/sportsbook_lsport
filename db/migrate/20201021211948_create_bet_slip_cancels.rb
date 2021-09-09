class CreateBetSlipCancels < ActiveRecord::Migration[6.0]
  def change
    create_table :bet_slip_cancels do |t|
      t.references :bet_slip, null: false, foreign_key: true
      t.string :status
      t.string :reason

      t.timestamps
    end
  end
end
