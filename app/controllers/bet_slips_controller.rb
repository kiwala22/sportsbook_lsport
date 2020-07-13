class BetSlipsController < ApplicationController
  before_action :authenticate_user!
  
  def index
  end

  def create
  end

  def show
  end

  def update
  end

  private
  def bet_slips_params
    params.require(:bet_slip).permit()
  end
  
end
