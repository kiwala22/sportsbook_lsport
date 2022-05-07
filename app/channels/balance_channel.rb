class BalanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "balance_#{params[:user]}"
  end

  def unsubscribed
    stop_all_streams
  end
end