class HomeController < ApplicationController
  include CurrentCart
  before_action :set_cart

  def index; end

  def basket_ball
  end
  
end
