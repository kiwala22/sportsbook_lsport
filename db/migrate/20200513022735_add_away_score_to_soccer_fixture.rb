class AddAwayScoreToSoccerFixture < ActiveRecord::Migration[6.0]
  def change
    add_column :soccer_fixtures, :away_score, :string
  end
end
