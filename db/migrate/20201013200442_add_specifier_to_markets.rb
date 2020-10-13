class AddSpecifierToMarkets < ActiveRecord::Migration[6.0]
  def change
    add_column :market1_pres, :specifier, :string
    add_column :market10_pres, :specifier, :string
    add_column :market16_pres, :specifier, :string
    add_column :market18_pres, :specifier, :string
    add_column :market29_pres, :specifier, :string
    add_column :market60_pres, :specifier, :string
    add_column :market63_pres, :specifier, :string
    add_column :market66_pres, :specifier, :string
    add_column :market68_pres, :specifier, :string
    add_column :market75_pres, :specifier, :string

    add_column :market1_lives, :specifier, :string
    add_column :market10_lives, :specifier, :string
    add_column :market16_lives, :specifier, :string
    add_column :market18_lives, :specifier, :string
    add_column :market29_lives, :specifier, :string
    add_column :market60_lives, :specifier, :string
    add_column :market63_lives, :specifier, :string
    add_column :market66_lives, :specifier, :string
    add_column :market68_lives, :specifier, :string
    add_column :market75_lives, :specifier, :string
    
    
  end
end
