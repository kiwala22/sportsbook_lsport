class AddThresholdToMarket68Live < ActiveRecord::Migration[6.0]
  def change
    add_column :market68_lives, :threshold, :decimal, precision: 5, scale: 2
  end
end
