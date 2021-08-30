class FixtureChannel < ApplicationCable::Channel
  def subscribed
    stream_from "fixtures_#{params[:fixture]}"
  end

  def unsubscribed
    stop_all_streams
  end
end
