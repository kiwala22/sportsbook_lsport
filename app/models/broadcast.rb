class Broadcast < ApplicationRecord

  belongs_to :admin

  validates  :message, :status, :subject, :start_date, :end_date, :execution_time, presence: true
  paginates_per 50

end
