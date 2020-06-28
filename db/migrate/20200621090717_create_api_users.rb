class CreateApiUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :api_users do |t|
      t.string :first_name
      t.string :last_name
      t.string :api_id
      t.string :api_key
      t.boolean :registered, default: false
      t.string :user_type

      t.timestamps
    end
  end
end
