class SignUpBonus < ApplicationRecord
    audited
    validates :amount, presence: true
	validates :expiry, presence: true
end
