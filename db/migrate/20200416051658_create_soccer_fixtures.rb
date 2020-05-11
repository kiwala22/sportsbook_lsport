class CreateSoccerFixtures < ActiveRecord::Migration[6.0]
  def change
    create_table :soccer_fixtures do |t|
      t.string :event_id
      t.timestamp :scheduled_time
      t.string :live_odds
      t.string :status
      t.string :tournament_round
      t.string :betradar_id
      t.integer :season_id
      t.string :season_name
      t.integer :tournament_id
      t.string :tournament_name
      t.string :sport_id
      t.string :sport
      t.string :category_id
      t.string :category
      t.string :comp_one_id
      t.string :comp_one_name
      t.string :comp_one_gender
      t.string :comp_one_abb
      t.string :comp_one_qualifier
      t.string :comp_two_id
      t.string :comp_two_name
      t.string :comp_two_gender
      t.string :comp_two_abb
      t.string :comp_two_qualifier
      
      t.timestamps
    end
  end
end
