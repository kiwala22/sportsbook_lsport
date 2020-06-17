class AddIndexToFixture < ActiveRecord::Migration[6.0]
  def change
    add_index :fixtures, :event_id
    add_index :fixtures, :status
    add_index :fixtures, :sport
    add_index :fixtures, :sport_id
    add_index :fixtures, :category_id
    add_index :fixtures, :category
    add_index :fixtures, :booked
    add_index :fixtures, :match_status
    add_index :fixtures, :scheduled_time
  end
end
