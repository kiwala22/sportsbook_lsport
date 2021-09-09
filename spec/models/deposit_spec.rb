require 'rails_helper'
require 'faker'

RSpec.describe Deposit, type: :model do
   subject {
      described_class.new(amount: 5000,
         network: "MTN Uganda",
         phone_number: "256776582036",
         payment_method: "mobile money",
         balance_after: "1000",
         balance_before: "6000",
         ext_transaction_id: Faker::IDNumber.valid ,
         transaction_id: Faker::IDNumber.valid ,
         resource_id: Faker::IDNumber.valid ,
         user_id: 5,
         receiving_fri: "2345@supa",
         status: "PENDING",
         message: "",
         currency: "UGX",
         phone_number: "256776582036",
         id: 1)
   }

   it "is valid with valid attributes" do
      expect(subject).to be_valid
   end

   it "is invalied with incorrect phone number" do
      subject.phone_number = "2567765820"
      expect(subject).to_not be_valid
   end
   it "is invalid if ext transaction_id is missing" do
      subject.ext_transaction_id = ""
      expect(subject).to_not be_valid
   end
   it "is invalid if transaction_id is missing" do
      subject.transaction_id = ""
      expect(subject).to_not be_valid
   end
   it "is invalid if resource id is missing" do
      subject.resource_id = ""
      expect(subject).to_not be_valid
   end
   it "is invalid if status is blank" do
      subject.status = ""
      expect(subject).to_not be_valid
   end
end
