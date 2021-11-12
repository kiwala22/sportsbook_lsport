# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  include Accessible
  skip_before_action :check_user, only: :destroy
  skip_before_action :verify_authenticity_token, only: :create
  layout 'application'
  include CurrentCart
  before_action :set_cart
  respond_to :json

  # GET /resource/sign_in
  def new
    #super
  end

  # POST /resource/sign_in
  def create
    user = User.find_by_phone_number(sign_in_params[:phone_number])

    if user && user.valid_password?(sign_in_params[:password])
      render json: { message: 'Login Successful.' }, status: 200
    else
      render json: {
               message: 'Phone Number or Password is incorrect'
             },
             status: 401
    end
  end

  # DELETE /resource/sign_out
  def destroy
    if sign_out(resource_name)
      render json: { message: 'Logged Out Successfully.' }, status: 200
    else
      render json: { message: 'Logged Out Failed. Try Again.' }, status: 401
    end
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
