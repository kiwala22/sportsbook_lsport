class AddStartAndEndDateToBroadcasts < ActiveRecord::Migration[6.1]
  def change
    add_column :broadcasts, :start_date, :datetime
    add_column :broadcasts, :end_date, :datetime
  end
end
