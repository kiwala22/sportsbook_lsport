class AddOutcomeDescToBet < ActiveRecord::Migration[6.0]
  def change
    add_column :bets, :outcome_desc, :string
  end
end
