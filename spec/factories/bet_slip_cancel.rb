FactoryBot.define do
   factory :bet_slip_cancel do
      reason {}
      status { "Pending" }
      bet_slip_id { 23}
   end
end
