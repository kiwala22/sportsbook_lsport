class BetslipChannel < ApplicationCable::Channel
   def subscribed
      stream_from "betslips_#{params[:market]}_#{params[:fixture]}"
   end

   def unsubscribed
      stop_all_streams
    end
end