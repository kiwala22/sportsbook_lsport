class LineBet < ApplicationRecord
  belongs_to :cart, dependent: :destroy
  belongs_to :fixture
end
