class CreateOutcomes < ActiveRecord::Migration[6.0]
  def change
    create_table :outcomes do |t|
      t.integer :outcome_id
      t.string :description

      t.timestamps
    end
  end
end
