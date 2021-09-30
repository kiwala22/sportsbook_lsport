class CreatePreMarkets < ActiveRecord::Migration[6.1]
  def change
    create_table :pre_markets do |t|
      t.jsonb :odds
      t.jsonb :results
      t.string :status
      t.string :market_identifier
      t.references :fixture, null: false, foreign_key: true

      t.timestamps
    end
  end
end
