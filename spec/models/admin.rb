require 'rails_helper'

RSpec.describe Admin, type: :model do
   subject {
      described_class.new(first_name: "first_name",
         last_name: "last name",
         email: "acacia@bengo.com",
         password: "Pa$$word5",
         password_confirmation: "Pa$$word5",
         id: 1)
   }

   it "is valid with valid attributes" do
      expect(subject).to be_valid
   end

   it "is invalied with incorrect email" do
      subject.email = "acacia@bengo@"
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
      subject.password = "Pass&word"
      expect(subject).to_not be_valid
   end

   it "is invalid if password is not complex" do
      subject.password = "password"
      subject.password_confirmation = "password"
      expect(subject).to_not be_valid
   end
end
