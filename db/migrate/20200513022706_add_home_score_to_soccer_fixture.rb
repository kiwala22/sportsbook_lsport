class AddHomeScoreToSoccerFixture < ActiveRecord::Migration[6.0]
  def change
    add_column :soccer_fixtures, :home_score, :string
  end
end
