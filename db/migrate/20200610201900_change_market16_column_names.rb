class ChangeMarket16ColumnNames < ActiveRecord::Migration[6.0]
  def up
    rename_column :market16_pres, :competitior2, :competitor2
    rename_column :market16_lives, :competitior2, :competitor2
  end

  def down
    rename_column :market16_pres, :competitor2, :competitior2
    rename_column :market16_lives, :competitor2, :competitior2
  end
end
