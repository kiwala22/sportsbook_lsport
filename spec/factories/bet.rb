FactoryBot.define do
   factory :bet do
      odds { 2 }
      status { "Pending" }
      product { "3" }
      user_id { user.id }
      fixture_id { 18526 }
      bet_slip_id { @betslip.id }
      outcome_id { 2 }
      market_id { 1 }
      result { nil }
      void_factor { nil }
      outcome_desc { "1X2 FT - 1"}
   end
end