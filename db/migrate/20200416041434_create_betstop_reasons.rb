class CreateBetstopReasons < ActiveRecord::Migration[6.0]
  def change
    create_table :betstop_reasons do |t|
      t.integer :betstop_reason_id
      t.string :description

      t.timestamps
    end
  end
end
