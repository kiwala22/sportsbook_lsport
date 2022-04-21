class TopupBonus < ApplicationRecord
    audited
    validates :amount, presence: true, unless: :multiplier
	validates :multiplier, presence: true, unless: :amount
end
