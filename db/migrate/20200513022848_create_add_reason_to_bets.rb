class CreateAddReasonToBets < ActiveRecord::Migration[6.0]
  def change
    create_table :add_reason_to_bets do |t|
      t.string :product

      t.timestamps
    end
  end
end
