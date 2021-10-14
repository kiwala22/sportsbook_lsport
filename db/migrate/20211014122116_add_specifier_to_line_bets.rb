class AddSpecifierToLineBets < ActiveRecord::Migration[6.1]
  def change
    add_column :line_bets, :specifier, :string
  end
end
