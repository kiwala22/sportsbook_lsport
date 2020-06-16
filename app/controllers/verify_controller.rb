class VerifyController < ApplicationController
  skip_before_action :redirect_if_unverified
  def new
  end

  def create
    current_user.send_pin!
    redirect_to new_verify_url, notice: "A PIN number has been sent to your phone"
  end

  def update
    if Time.now > current_user.pin_sent_at.advance(minutes: 10)
      flash.now[:alert] = "Your pin has expired. Please request another."
      render :new and return
    elsif params[:pin].try(:to_i) == current_user.pin
      current_user.update_attribute(:verified, true)
      redirect_to authenticated_user_root_path, notice: "Your phone number has been verified!"
    else
      flash.now[:alert] = "The code you entered is invalid."
      render :new
    end
  end
end
