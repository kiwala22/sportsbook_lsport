class Manager < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :validatable, :lockable, :timeoutable, :trackable

  validates :email, presence: true
  validates :email, uniqueness: true
  validates :email, format: {with: /\A[^@\s]+@[^@\s]+\z/ }
  validates :first_name, presence: true
  validates :last_name, presence: true
end
