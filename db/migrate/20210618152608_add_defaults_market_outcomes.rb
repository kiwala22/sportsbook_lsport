class AddDefaultsMarketOutcomes < ActiveRecord::Migration[6.0]
  def change
    change_column :market1_pres, :outcome_1, :decimal, default: 1.0
    change_column :market1_pres, :outcome_X, :decimal, default: 1.0
    change_column :market1_pres, :outcome_2, :decimal, default: 1.0
    change_column :market1_lives, :outcome_1, :decimal, default: 1.0
    change_column :market1_lives, :outcome_X, :decimal, default: 1.0
    change_column :market1_lives, :outcome_2, :decimal, default: 1.0

    change_column :market2_pres, :outcome_Under, :decimal, default: 1.0
    change_column :market2_pres, :outcome_Over, :decimal, default: 1.0
    change_column :market2_lives, :outcome_Under, :decimal, default: 1.0
    change_column :market2_lives, :outcome_Over, :decimal, default: 1.0

    change_column :market3_pres, :outcome_1, :decimal, default: 1.0
    change_column :market3_pres, :outcome_2, :decimal, default: 1.0
    change_column :market3_lives, :outcome_1, :decimal, default: 1.0
    change_column :market3_lives, :outcome_2, :decimal, default: 1.0

    change_column :market7_pres, :outcome_12, :decimal, default: 1.0
    change_column :market7_pres, :outcome_1X, :decimal, default: 1.0
    change_column :market7_pres, :outcome_X2, :decimal, default: 1.0
    change_column :market7_lives, :outcome_12, :decimal, default: 1.0
    change_column :market7_lives, :outcome_1X, :decimal, default: 1.0
    change_column :market7_lives, :outcome_X2, :decimal, default: 1.0

    change_column :market17_pres, :outcome_Yes, :decimal, default: 1.0
    change_column :market17_pres, :outcome_No, :decimal, default: 1.0
    change_column :market17_lives, :outcome_Yes, :decimal, default: 1.0
    change_column :market17_lives, :outcome_No, :decimal, default: 1.0

    change_column :market25_pres, :outcome_12, :decimal, default: 1.0
    change_column :market25_pres, :outcome_1X, :decimal, default: 1.0
    change_column :market25_pres, :outcome_X2, :decimal, default: 1.0
    change_column :market25_lives, :outcome_12, :decimal, default: 1.0
    change_column :market25_lives, :outcome_1X, :decimal, default: 1.0
    change_column :market25_lives, :outcome_X2, :decimal, default: 1.0

    change_column :market53_pres, :outcome_1, :decimal, default: 1.0
    change_column :market53_pres, :outcome_2, :decimal, default: 1.0
    change_column :market53_lives, :outcome_1, :decimal, default: 1.0
    change_column :market53_lives, :outcome_2, :decimal, default: 1.0

    change_column :market77_pres, :outcome_Under, :decimal, default: 1.0
    change_column :market77_pres, :outcome_Over, :decimal, default: 1.0
    change_column :market77_lives, :outcome_Under, :decimal, default: 1.0
    change_column :market77_lives, :outcome_Over, :decimal, default: 1.0

    change_column :market113_pres, :outcome_Yes, :decimal, default: 1.0
    change_column :market113_pres, :outcome_No, :decimal, default: 1.0
    change_column :market113_lives, :outcome_Yes, :decimal, default: 1.0
    change_column :market113_lives, :outcome_No, :decimal, default: 1.0

    change_column :market282_pres, :outcome_1, :decimal, default: 1.0
    change_column :market282_pres, :outcome_X, :decimal, default: 1.0
    change_column :market282_pres, :outcome_2, :decimal, default: 1.0
    change_column :market282_lives, :outcome_1, :decimal, default: 1.0
    change_column :market282_lives, :outcome_X, :decimal, default: 1.0
    change_column :market282_lives, :outcome_2, :decimal, default: 1.0
  end
end
