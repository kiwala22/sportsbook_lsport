class Api::V1::BetsController < ApplicationController
  before_action :authenticate_user!
  include CurrentCart
  before_action :set_cart

  def index
    @bets = current_user.bet_slips.all.where("bet_count > ?", 0).order("created_at DESC")

    render json: @bets
  end

end
