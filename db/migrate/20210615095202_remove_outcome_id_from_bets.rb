class RemoveOutcomeIdFromBets < ActiveRecord::Migration[6.0]
  def change
  	remove_column :bets, :outcome_id
  end
end
