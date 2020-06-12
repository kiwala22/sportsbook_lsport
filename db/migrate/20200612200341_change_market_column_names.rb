class ChangeMarketColumnNames < ActiveRecord::Migration[6.0]
  def up
    rename_column :market10_pres, :competitior1_competitior2, :competitor1_competitor2
    rename_column :market10_lives, :competitior1_competitior2, :competitor1_competitor2
    rename_column :market63_pres, :competitior1_competitior2, :competitor1_competitor2
    rename_column :market63_lives, :competitior1_competitior2, :competitor1_competitor2
    rename_column :market66_pres, :competitior2, :competitor2
    rename_column :market66_lives, :competitior2, :competitor2
  end

  def down
    rename_column :market10_pres, :competitor1_competitor2, :competitior1_competitior2
    rename_column :market10_lives, :competitor1_competitor2, :competitior1_competitior2
    rename_column :market63_pres, :competitor1_competitor2, :competitior1_competitior2
    rename_column :market63_lives, :competitor1_competitor2, :competitior1_competitior2
    rename_column :market66_pres, :competitor2, :competitior2
    rename_column :market66_lives, :competitor2, :competitior2
end
