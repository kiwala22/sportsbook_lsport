class BetSlip < ApplicationRecord
  audited
   belongs_to :user
   has_many :bets

   enum bet_slip_status: {
     "Select One" => "",
     "Active" => "Active",
     "Closed" => "Closed"
   }

   enum bet_slip_result: {
     "Select one" => "",
     "Win" => "Win",
     "Loss" => "Loss"
   }

   def self.close_betslips
      BetslipsWorker.perform_async()
   end

end
