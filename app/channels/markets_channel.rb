class MarketsChannel < ApplicationCable::Channel
   def subscribed
      stream_from "markets"
   end

   def unsubscribed
      stop_all_streams
   end
end