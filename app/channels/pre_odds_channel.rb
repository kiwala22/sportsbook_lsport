class PreOddsChannel < ApplicationCable::Channel
   def subscribed
      stream_from "pre_odds"
   end

   def unsubscribed
      stop_all_streams
   end
end