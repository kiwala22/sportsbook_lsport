class Cart < ApplicationRecord
   has_many :line_bets, dependent: :destroy
end
