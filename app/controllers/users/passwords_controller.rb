# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  prepend_before_action :require_no_authentication
  respond_to :json

  # GET /resource/password/new
  def new
    # super
    redirect_to root_path
  end

  # POST /resource/password
  # def create
  #   super
  # end

  # GET /resource/password/edit?reset_password_token=abcdef
  # def edit
  #   super
  # end

  # PUT /resource/password
  def update
    #super
    self.resource = resource_class.reset_password_by_token(resource_params)
    yield resource if block_given?

    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      if Devise.sign_in_after_reset_password
        resource.after_database_authentication
        sign_in(resource_name, resource)
      else
        flash_message = :updated_not_active
        render json: { message: flash_message }, status: 500
      end
      render json: {
               message:
                 'Your Password has been reset successfully. You are now Logged in.'
             },
             status: 200
    else
      set_minimum_password_length
      render json: { message: resource.errors.full_messages[0] }, status: 500
    end
  end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end
end
