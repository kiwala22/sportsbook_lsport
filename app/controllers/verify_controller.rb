class VerifyController < ApplicationController
  #skip_before_action :redirect_if_unverified

  #before_action :verification_access

  def new; end

  def create
    current_user.resend_user_pin!
    render json: {
             message: 'A PIN number has been sent to your phone'
           },
           status: 200
    # redirect_to new_verify_url, notice: "A PIN number has been sent to your phone"
  end

  def update
    if Time.now > current_user.pin_sent_at.advance(minutes: 10)
      render json: {
               message: 'Your pin has expired. Please request another.'
             },
             status: 422

      # flash.now[:alert] = "Your pin has expired. Please request another."
      # render :new and return
      return
    elsif params[:pin].try(:to_i) == current_user.pin
      current_user.update_attribute(:verified, true)

      # redirect_to root_path, notice: "Your phone number has been verified!"
      render json: {
               message: 'Your phone number has been verified!',
               user: current_user
             },
             status: 200
    else
      # flash.now[:alert] = "The code you entered is invalid."
      # render :new
      render json: { message: 'The code you entered is invalid.' }, status: 422
    end
  end

  def verify_via_email
    #method to veirfy phone number via email
    VerifyMailer.with(id: current_user.id).verification_email.deliver_now
    flash.now[:notice] = 'A Code has been sent to your email address.'
    render :new and return
  end

  protected

  def verification_access
    if (!user_signed_in? || current_user.verified?)
      redirect_to root_path, notice: 'Page you requested can not be found.'
    end
  end
end
