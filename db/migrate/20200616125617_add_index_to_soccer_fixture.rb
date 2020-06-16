class AddIndexToSoccerFixture < ActiveRecord::Migration[6.0]
  def change
    add_index :soccer_fixtures, :event_id
    add_index :soccer_fixtures, :status
    add_index :soccer_fixtures, :sport
    add_index :soccer_fixtures, :booked
    add_index :soccer_fixtures, :match_status
    add_index :soccer_fixtures, :category
    add_index :soccer_fixtures, :scheduled_time
  end
end
