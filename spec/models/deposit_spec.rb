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
   it "is invalid if first name is missing" do
      subject.first_name = ""
      expect(subject).to_not be_valid
   end
   it "is invalid is last name is missing" do
      subject.last_name = ""
      expect(subject).to_not be_valid
   end
   it "is invalid if password is empty" do
      subject.password = ""
      expect(subject).to_not be_valid
   end
   it "is invalid if password and password confirmation do not matche" do
      subject.password = "password"
      expect(subject).to_not be_valid
   end
end
