FactoryBot.define do
   factory :admin do
      first_name { Faker::Name.first_name }
      last_name { Faker::Name.last_name  }
      email { "acaciabengo@skylinesms.com"  }
      password { "jtwiqotbs@1Just"  }
      password_confirmation { "jtwiqotbs@1Just"  }
   end
 end