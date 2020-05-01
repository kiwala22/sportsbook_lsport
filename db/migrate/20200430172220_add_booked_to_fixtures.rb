class AddBookedToFixtures < ActiveRecord::Migration[6.0]
  def change
    add_column :fixtures, :booked, :boolean, :default => false
  end
end
