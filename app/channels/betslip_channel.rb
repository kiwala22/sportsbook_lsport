class BetslipChannel < ApplicationCable::Channel
   def subscribed
      stream_from "betslips"
   end

   def unsubscribed
      stop_all_streams
    end
end