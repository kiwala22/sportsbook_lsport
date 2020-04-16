class CreateVoidReasons < ActiveRecord::Migration[6.0]
  def change
    create_table :void_reasons do |t|
      t.integer :void_reason_id
      t.string :description

      t.timestamps
    end
  end
end
