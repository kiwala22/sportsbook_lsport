require 'rails_helper'

RSpec.describe User, type: :model do

   subject {
      described_class.new(first_name: "first_name",
         last_name: "last name",
         phone_number: "256776582036",
         password: "pa$$word",
         password_confirmation: "pa$$word",
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
