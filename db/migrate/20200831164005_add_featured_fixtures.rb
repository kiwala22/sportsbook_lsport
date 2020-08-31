class AddFeaturedFixtures < ActiveRecord::Migration[6.0]
  def change
    add_column :fixtures, :featured, :boolean, default: false
  end
end
