class Api::V1::TransactionsController < ApplicationController
  before_action :authenticate_user!
  include CurrentCart
  before_action :set_cart
  def index
    @transactions = current_user.transactions.all.order("created_at DESC")

    render json: @transactions
  end
end
