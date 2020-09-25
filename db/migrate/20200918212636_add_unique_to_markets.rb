class AddUniqueToMarkets < ActiveRecord::Migration[6.0]
  def change
    #market1
    remove_index :market1_pres, :event_id
    add_index :market1_pres, :event_id, unique: true
    remove_index :market1_lives, :event_id
    add_index :market1_lives, :event_id, unique: true
    
    #market10
    remove_index :market10_pres, :event_id
    add_index :market10_pres, :event_id, unique: true
    remove_index :market10_lives, :event_id
    add_index :market10_lives, :event_id, unique: true
    
    #market16
    remove_index :market16_pres, :event_id
    add_index :market16_pres, :event_id, unique: true
    remove_index :market16_lives, :event_id
    add_index :market16_lives, :event_id, unique: true
    
    #market18
    remove_index :market18_pres, :event_id
    add_index :market18_pres, :event_id, unique: true
    remove_index :market18_lives, :event_id
    add_index :market18_lives, :event_id, unique: true
    
    #market29
    remove_index :market29_pres, :event_id
    add_index :market29_pres, :event_id, unique: true
    remove_index :market29_lives, :event_id
    add_index :market29_lives, :event_id, unique: true
    
    #market60
    remove_index :market60_pres, :event_id
    add_index :market60_pres, :event_id, unique: true
    remove_index :market60_lives, :event_id
    add_index :market60_lives, :event_id, unique: true
    
    #market63
    remove_index :market63_pres, :event_id
    add_index :market63_pres, :event_id, unique: true
    remove_index :market63_lives, :event_id
    add_index :market63_lives, :event_id, unique: true
    
    #market66
    remove_index :market66_pres, :event_id
    add_index :market66_pres, :event_id, unique: true
    remove_index :market66_lives, :event_id
    add_index :market66_lives, :event_id, unique: true
    
    #market68
    remove_index :market68_pres, :event_id
    add_index :market68_pres, :event_id, unique: true
    remove_index :market68_lives, :event_id
    add_index :market68_lives, :event_id, unique: true
    
    #market75
    remove_index :market75_pres, :event_id
    add_index :market75_pres, :event_id, unique: true
    remove_index :market75_lives, :event_id
    add_index :market75_lives, :event_id, unique: true
  end
end
