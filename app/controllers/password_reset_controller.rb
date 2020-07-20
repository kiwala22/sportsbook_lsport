class PasswordResetController < ApplicationController

  def new
  end

  def create
    @@user = User.find_by(phone_number: params[:phone_number])
    if @@user
      @@user.generate_password_reset
      flash[:notice] = "Reset Code has been sent to your phone number."
      redirect_to verify_reset_code_path
    else
      flash[:alert] = "Phone Number does not seem to have an active account."
      render :new
    end
  end

  def edit
  end

  def update
    #First check if code is not expired
    if Time.now > @@user.password_reset_sent_at.advance(minutes: 5)
      flash[:alert] = "Your verification code has expired. Please request another."
      render :new
    elsif params[:reset_code].try(:to_i) == @@user.password_reset_code
      raw_token, hashed_token = Devise.token_generator.generate(User, :reset_password_token)
      @@user.update(reset_password_token: hashed_token)
      @@user.update(reset_password_sent_at: Time.now)
      redirect_to edit_user_password_path(@@user, :reset_password_token => raw_token)
    else
      #flash an alert stating incorrect verification code
      flash[:alert] = "Incorrect Verification Code."
      redirect_to verify_reset_code_path
    end
  end
end
