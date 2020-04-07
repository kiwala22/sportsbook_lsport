class Deposit < ApplicationRecord

   validates :amount, presence: true
   validates :network, presence: true
   validates :payment_method, presence: true
   validates :transaction_id, presence: true
   validates :ext_transaction_id, presence: true
   validates :resource_id, presence: true
   validates :status, presence: true
   validates :currency, presence: true
   validates :phone_number, presence: true
   validates :transaction_id, uniqueness: true
   validates :ext_transaction_id, uniqueness: true
   validates :resource_id, uniqueness: true
end
