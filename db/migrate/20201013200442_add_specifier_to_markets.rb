class AddSpecifierToMarkets < ActiveRecord::Migration[6.0]
  def change
    add_column :market1_pres, :specifier, :json
    add_column :market10_pres, :specifier, :json
    add_column :market16_pres, :specifier, :json
    add_column :market18_pres, :specifier, :json
    add_column :market29_pres, :specifier, :json
    add_column :market60_pres, :specifier, :json
    add_column :market63_pres, :specifier, :json
    add_column :market66_pres, :specifier, :json
    add_column :market68_pres, :specifier, :json
    add_column :market75_pres, :specifier, :json

    add_column :market1_lives, :specifier, :json
    add_column :market10_lives, :specifier, :json
    add_column :market16_lives, :specifier, :json
    add_column :market18_lives, :specifier, :json
    add_column :market29_lives, :specifier, :json
    add_column :market60_lives, :specifier, :json
    add_column :market63_lives, :specifier, :json
    add_column :market66_lives, :specifier, :json
    add_column :market68_lives, :specifier, :json
    add_column :market75_lives, :specifier, :json
    
    
  end
end
