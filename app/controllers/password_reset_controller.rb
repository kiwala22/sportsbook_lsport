class PasswordResetController < ApplicationController

  # include CurrentCart
  # before_action :set_cart

  def new
  end

  def create
    @@user = User.find_by(phone_number: params[:phone_number])
    if @@user
      @@user.generate_password_reset
      render json: {message: "A Reset Code has been sent to your Phone Number." }, status: 200
    else
      render json: {message: "Phone Number is not registered yet."}, status: 401
    end
  end

  def edit
  end

  def update
    #First check if code is not expired
    if Time.now > @@user.password_reset_sent_at.advance(minutes: 10)
      render json: {message: "Your verification code has expired. Please request another."}, status: 401
    elsif params[:reset_code].try(:to_i) == @@user.password_reset_code
      raw_token, hashed_token = Devise.token_generator.generate(User, :reset_password_token)
      @@user.update(reset_password_token: hashed_token)
      @@user.update(reset_password_sent_at: Time.now)
      render json: {message: "Success. Provide New Password.", user: @@user, token: raw_token}, status: 200
    else
      #flash an alert stating incorrect verification code
      render json: {message: "Incorrect Verification Code."}, status: 401
    end
  end
end
