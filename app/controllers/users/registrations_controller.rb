# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :verify_authenticity_token, :only => :create
  layout "application"
  include CurrentCart
  before_action :set_cart
  respond_to :json

  # GET /resource/sign_up
  def new
    # super
    redirect_to root_path
  end

  # POST /resource
  def create
    # super
    user = User.new sign_up_params
    if user.save
      sign_in(user)
      render :json=> {message: "Sign Up Success. Please verify phone number"}, :status=>200
    else
      warden.custom_failure!
      render :json=> {message: user.errors.full_messages[0]}, :status=>500
    end
  end

  # GET /resource/edit
  # def edit
  #   redirect_to error_path
  #   redirect('/404.html')
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
