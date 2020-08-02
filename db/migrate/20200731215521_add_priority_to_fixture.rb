class AddPriorityToFixture < ActiveRecord::Migration[6.0]
  def change
    add_column :fixtures, :priority, :string
  end
end
