class AddUniqueToMarkets < ActiveRecord::Migration[6.0]
  def change
    #market1
    remove_index :market1_pres, :event_id
    add_index :market1_pres, :event_id, unique: true
    remove_index :market1_lives, :event_id
    add_index :market1_lives, :event_id, unique: true
    
    #market7
    remove_index :market7_pres, :event_id
    add_index :market7_pres, :event_id, unique: true
    remove_index :market7_lives, :event_id
    add_index :market7_lives, :event_id, unique: true
    
    #market3
    remove_index :market3_pres, :event_id
    add_index :market3_pres, :event_id, unique: true
    remove_index :market3_lives, :event_id
    add_index :market3_lives, :event_id, unique: true
    
    #market2
    remove_index :market2_pres, :event_id
    add_index :market2_pres, :event_id, unique: true
    remove_index :market2_lives, :event_id
    add_index :market2_lives, :event_id, unique: true
    
    #market17
    remove_index :market17_pres, :event_id
    add_index :market17_pres, :event_id, unique: true
    remove_index :market17_lives, :event_id
    add_index :market17_lives, :event_id, unique: true
    
    #market282
    remove_index :market282_pres, :event_id
    add_index :market282_pres, :event_id, unique: true
    remove_index :market282_lives, :event_id
    add_index :market282_lives, :event_id, unique: true
    
    #market25
    remove_index :market25_pres, :event_id
    add_index :market25_pres, :event_id, unique: true
    remove_index :market25_lives, :event_id
    add_index :market25_lives, :event_id, unique: true
    
    #market53
    remove_index :market53_pres, :event_id
    add_index :market53_pres, :event_id, unique: true
    remove_index :market53_lives, :event_id
    add_index :market53_lives, :event_id, unique: true
    
    #market77
    remove_index :market77_pres, :event_id
    add_index :market77_pres, :event_id, unique: true
    remove_index :market77_lives, :event_id
    add_index :market77_lives, :event_id, unique: true
    
    #market113
    remove_index :market113_pres, :event_id
    add_index :market113_pres, :event_id, unique: true
    remove_index :market113_lives, :event_id
    add_index :market113_lives, :event_id, unique: true
  end
end
