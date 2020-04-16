class CreateFixtures < ActiveRecord::Migration[6.0]
  def change
    create_table :fixtures do |t|
      t.integer :event_id
      t.timestamp :scheduled_time
      t.string :live_odds
      t.string :status
      t.string :tournament_round
      t.integer :betradar_id
      t.integer :season_id
      t.string :season_name
      t.integer :tournament_id
      t.string :tournament_name
      t.integer :sport_id
      t.string :sport
      t.integer :category_id
      t.string :category
      t.integer :venue_id
      t.string :venue
      t.integer :comp_one_id
      t.string :comp_one
      t.string :comp_one_gender
      t.string :comp_one_abb
      t.integer :comp_two_id
      t.string :comp_two
      t.string :comp_two_gender
      t.string :comp_two_abb

      t.timestamps
    end
  end
end
