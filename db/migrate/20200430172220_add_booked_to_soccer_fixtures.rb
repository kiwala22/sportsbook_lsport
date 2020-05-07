class AddBookedToSoccerFixtures < ActiveRecord::Migration[6.0]
  def change
    add_column :soccer_fixtures, :booked, :boolean, :default => false
  end
end
