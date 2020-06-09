class AddThresholdToMarket18Pre < ActiveRecord::Migration[6.0]
  def change
    add_column :market18_pres, :threshold, :decimal, precision: 5, scale: 2
  end
end
