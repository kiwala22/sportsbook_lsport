class SlipBonus < ApplicationRecord
	audited
    validates :min_accumulator, presence: true
	validates :max_accumulator, presence: true
	validates :multiplier, presence: true
end
