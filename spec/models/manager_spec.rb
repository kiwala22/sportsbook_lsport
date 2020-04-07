require 'rails_helper'

RSpec.describe Manager, type: :model do
   it "is valid with valid attributes"
   it "is invalied if invalid email"
   it "is invalid if first name is missing"
   it "is invalid is last name is missing"
   it "it invalid if password is empty"
end
