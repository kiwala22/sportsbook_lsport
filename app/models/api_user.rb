class ApiUser < ApplicationRecord
  audited
  validates :user_type,:api_id, :first_name, presence: true
end
