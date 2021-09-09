FactoryBot.define do
   factory :user do
      first_name { Faker::Name.first_name }
      last_name { Faker::Name.last_name  }
      email { Faker::Internet.email  }
      phone_number { "256776582036"  }
      password { "jtwiqotbs"  }
      password_confirmation { "jtwiqotbs"  }
      balance { 5000  }
      verified { true }
   end
 end