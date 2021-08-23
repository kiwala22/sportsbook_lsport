class Api::V1::BetsController < ApplicationController
  before_action :authenticate_user!
  include CurrentCart
  before_action :set_cart

  def index
    @bets = current_user.bet_slips.all.where("bet_count > ?", 0).order("created_at DESC")

    bets = []

    @bets.each do |obj|
      bet = obj.as_json
      bet["bets"] = obj.bets.as_json
      bet["bets"].each do |event|
        fixture = Fixture.find(event["fixture_id"])
        event["fixture"] = fixture
      end
      bets << bet
    end

    render json: bets
  end

end
