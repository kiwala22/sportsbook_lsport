class PreOddsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "pre_odds_#{params[:market]}_#{params[:fixture]}"
  end

  def unsubscribed
    stop_all_streams
  end
end
