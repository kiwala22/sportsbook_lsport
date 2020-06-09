class CreateMarket29Lives < ActiveRecord::Migration[6.0]
  def change
    create_table :market29_lives do |t|
      t.string :event_id
      t.decimal :yes, precision: 6, scale: 2
      t.decimal :no, precision: 6, scale: 2
      t.string :status
      t.timestamps
    end
  end
end