class RenameTables < ActiveRecord::Migration[6.0]
  def change
  	rename_table :market10_pres, :market7_pres
  	rename_table :market10_lives, :market7_lives

  	rename_table :market16_pres, :market3_pres
  	rename_table :market16_lives, :market3_lives

  	rename_table :market18_pres, :market2_pres
  	rename_table :market18_lives, :market2_lives

  	rename_table :market29_pres, :market17_pres
  	rename_table :market29_lives, :market17_lives

  	rename_table :market60_pres, :market282_pres
  	rename_table :market60_lives, :market282_lives

  	rename_table :market63_pres, :market25_pres
  	rename_table :market63_lives, :market25_lives

  	rename_table :market66_pres, :market53_pres
  	rename_table :market66_lives, :market53_lives

  	rename_table :market68_pres, :market77_pres
  	rename_table :market68_lives, :market77_lives

  	rename_table :market75_pres, :market113_pres
  	rename_table :market75_lives, :market113_lives
  end
end
