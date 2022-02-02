class AddSportToBets < ActiveRecord::Migration[6.1]
  def change
    add_column :bets, :sport, :string
  end
end
