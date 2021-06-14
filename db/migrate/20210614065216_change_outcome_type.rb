class ChangeOutcomeType < ActiveRecord::Migration[6.0]
  def change
    change_column :outcomes, :outcome_id, :string
  end
end
