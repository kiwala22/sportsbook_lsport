class AddMatchStatusToSoccerFixture < ActiveRecord::Migration[6.0]
  def change
    add_column :soccer_fixtures, :match_status, :string
  end
end
