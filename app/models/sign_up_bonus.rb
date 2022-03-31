class SignUpBonus < ApplicationRecord
    validates :amount, presence: true
	validates :expiry, presence: true
end
