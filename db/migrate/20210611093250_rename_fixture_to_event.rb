class RenameFixtureToEvent < ActiveRecord::Migration[6.0]
  def change
    rename_column :fixtures, :fixture_id, :event_id
  end
end
