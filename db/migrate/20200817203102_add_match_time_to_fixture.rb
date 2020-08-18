class AddMatchTimeToFixture < ActiveRecord::Migration[6.0]
  def change
    add_column :fixtures, :match_time, :string
  end
end
