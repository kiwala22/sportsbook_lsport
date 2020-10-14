class AddAgreementToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :agreement, :boolean
  end
end
