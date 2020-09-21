class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception, prepend: true
  include Pagy::Backend

  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_raven_context
  before_action :redirect_if_unverified
  before_action :detect_device_variant
  before_action :set_no_cache


  private

  def after_sign_out_path_for(resource_or_scope)
    if resource_or_scope == :admin
      unauthenticated_admins_root_path
    else
      root_path
    end
  end

  def set_no_cache
    response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 01 Jan 1990 00:00:00 GMT"
  end


  protected

  def configure_permitted_parameters
    added_attrs = [:phone_number, :email, :password, :password_confirmation, :remember_me, :first_name, :last_name]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
    devise_parameter_sanitizer.permit(:sign_in, keys: [:phone_number])
  end

  def set_raven_context
    Raven.user_context(id: session[:current_user_id]) # or anything else in session
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end

  def redirect_if_unverified
    if user_signed_in? && !current_user.verified?
      redirect_to new_verify_url, notice: "Please verify your phone number"
    end
  end

  def detect_device_variant
    request.variant = :phone if browser.device.mobile?
  end

end
