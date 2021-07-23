class AddReferenceToNewMarkets < ActiveRecord::Migration[6.1]
  def change

  	#market 52
  	add_index :market52_pres, :event_id, unique: true
  	add_index :market52_pres, :status
  	add_reference :market52_pres, :fixture, null: false, foreign_key: true

  	add_index :market52_lives, :event_id, unique: true
  	add_index :market52_lives, :status
  	add_reference :market52_lives, :fixture, null: false, foreign_key: true

  	#market 63
  	add_index :market63_pres, :event_id, unique: true
  	add_index :market63_pres, :status
  	add_reference :market63_pres, :fixture, null: false, foreign_key: true

  	add_index :market63_lives, :event_id, unique: true
  	add_index :market63_lives, :status
  	add_reference :market63_lives, :fixture, null: false, foreign_key: true


  	#market 28
  	add_index :market28_pres, :event_id, unique: true
  	add_index :market28_pres, :status
  	add_reference :market28_pres, :fixture, null: false, foreign_key: true

  	add_index :market28_lives, :event_id, unique: true
  	add_index :market28_lives, :status
  	add_reference :market28_lives, :fixture, null: false, foreign_key: true


  	#market 41
  	add_index :market41_pres, :event_id, unique: true
  	add_index :market41_pres, :status
  	add_reference :market41_pres, :fixture, null: false, foreign_key: true

  	add_index :market41_lives, :event_id, unique: true
  	add_index :market41_lives, :status
  	add_reference :market41_lives, :fixture, null: false, foreign_key: true


  	#market 42
  	add_index :market42_pres, :event_id, unique: true
  	add_index :market42_pres, :status
  	add_reference :market42_pres, :fixture, null: false, foreign_key: true

  	add_index :market42_lives, :event_id, unique: true
  	add_index :market42_lives, :status
  	add_reference :market42_lives, :fixture, null: false, foreign_key: true

  	
  	#market 43
  	add_index :market43_pres, :event_id, unique: true
  	add_index :market43_pres, :status
  	add_reference :market43_pres, :fixture, null: false, foreign_key: true

  	add_index :market43_lives, :event_id, unique: true
  	add_index :market43_lives, :status
  	add_reference :market43_lives, :fixture, null: false, foreign_key: true

  	#market 44
  	add_index :market44_pres, :event_id, unique: true
  	add_index :market44_pres, :status
  	add_reference :market44_pres, :fixture, null: false, foreign_key: true

  	add_index :market44_lives, :event_id, unique: true
  	add_index :market44_lives, :status
  	add_reference :market44_lives, :fixture, null: false, foreign_key: true

  	#market 49
  	add_index :market49_pres, :event_id, unique: true
  	add_index :market49_pres, :status
  	add_reference :market49_pres, :fixture, null: false, foreign_key: true

  	add_index :market49_lives, :event_id, unique: true
  	add_index :market49_lives, :status
  	add_reference :market49_lives, :fixture, null: false, foreign_key: true





  end
end
