class FixColumnName < ActiveRecord::Migration[6.0]
  def change
  	rename_column :fixtures, :event_id, :fixture_id
  	rename_column :fixtures, :scheduled_time, :start_date
  	rename_column :fixtures, :betradar_id, :ext_provider_id

  	rename_column :fixtures, :tournament_id, :league_id
  	rename_column :fixtures, :tournament_name, :league_name

  	rename_column :fixtures, :category_id, :location_id
  	rename_column :fixtures, :category, :location

  	rename_column :fixtures, :comp_one_id, :part_one_id
  	rename_column :fixtures, :comp_one_name, :part_one_name

  	rename_column :fixtures, :comp_two_id, :part_two_id
  	rename_column :fixtures, :comp_two_name, :part_two_name

  	remove_column :fixtures, :comp_one_gender
  	remove_column :fixtures, :comp_one_abb
  	remove_column :fixtures, :comp_one_qualifier

  	remove_column :fixtures, :comp_two_gender
  	remove_column :fixtures, :comp_two_abb
  	remove_column :fixtures, :comp_two_qualifier


  end
end
