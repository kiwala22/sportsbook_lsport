class AddSportToLineBets < ActiveRecord::Migration[6.1]
  def change
    add_column :line_bets, :sport, :string
  end
end
