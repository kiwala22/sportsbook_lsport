class TopupBonus < ApplicationRecord
    validates :amount, presence: true, unless: :multiplier
	validates :multiplier, presence: true, unless: :amount
end
