class AddSpecifierToMarkets < ActiveRecord::Migration[6.0]
  def change
    add_column :market1_pres, :specifier, :string
    add_column :market7_pres, :specifier, :string
    add_column :market3_pres, :specifier, :string
    add_column :market2_pres, :specifier, :string
    add_column :market17_pres, :specifier, :string
    add_column :market282_pres, :specifier, :string
    add_column :market25_pres, :specifier, :string
    add_column :market53_pres, :specifier, :string
    add_column :market77_pres, :specifier, :string
    add_column :market113_pres, :specifier, :string

    add_column :market1_lives, :specifier, :string
    add_column :market7_lives, :specifier, :string
    add_column :market3_lives, :specifier, :string
    add_column :market2_lives, :specifier, :string
    add_column :market17_lives, :specifier, :string
    add_column :market282_lives, :specifier, :string
    add_column :market25_lives, :specifier, :string
    add_column :market53_lives, :specifier, :string
    add_column :market77_lives, :specifier, :string
    add_column :market113_lives, :specifier, :string
    
    
  end
end
