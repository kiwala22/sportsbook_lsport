class BetSlip < ApplicationRecord
   belongs_to :user
   has_many :bets

   def self.close_betslips
      BetslipsWorker.perform_async()
   end
   
end
