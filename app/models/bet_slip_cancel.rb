class BetSlipCancel < ApplicationRecord
  belongs_to :bet_slip
  validates_uniqueness_of :bet_slip_id
end
