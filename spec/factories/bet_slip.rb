FactoryBot.define do
   factory :bet_slip do
      bet_count { 2 }
      stake { 1000 }
      win_amount { 0.0 }
      odds { 5 }
      potential_win_amount { 5000.0 }
      status { "Pending" }
      user_id { 23}
   end
end
