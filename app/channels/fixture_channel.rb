class FixtureChannel < ApplicationCable::Channel
   def subscribed
      stream_from "fixtures"
   end

   def unsubscribed
      stop_all_streams
   end
end