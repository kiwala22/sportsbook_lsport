class RenamePromoToSubject < ActiveRecord::Migration[6.1]
  def change
    rename_column :broadcasts, :promo, :subject

  end
end
