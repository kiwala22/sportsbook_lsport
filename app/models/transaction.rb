class Transaction < ApplicationRecord
  validates_length_of :phone_number, :is => 12, :message => "number should be 12 digits long."
	validates_format_of :phone_number, :with => /\A[256]/, :message => "number should start with 256."

  paginates_per 10

  belongs_to :user
end
