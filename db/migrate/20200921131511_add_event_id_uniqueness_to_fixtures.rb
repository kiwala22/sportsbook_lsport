class AddEventIdUniquenessToFixtures < ActiveRecord::Migration[6.0]
  def change
    
    remove_index :fixtures, :event_id
    add_index :fixtures, :event_id, unique: true
    
  end
end
