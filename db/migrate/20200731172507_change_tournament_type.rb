class ChangeTournamentType < ActiveRecord::Migration[6.0]
  def change
    change_column :fixtures, :tournament_id, :string
  end
end
