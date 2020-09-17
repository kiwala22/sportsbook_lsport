class LiveOddsChannel < ApplicationCable::Channel
   def subscribed
      stream_from "live_odds"
   end

   def unsubscribed
      stop_all_streams
   end
end