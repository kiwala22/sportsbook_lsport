class Bet < ApplicationRecord
   belongs_to :user
   belongs_to :fixture
   belongs_to :bet_slip
   # belongs_to :market

end
