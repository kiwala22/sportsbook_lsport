module Accessible
  extend ActiveSupport::Concern
  included { before_action :check_user }

  protected

  def check_user
    if current_admin
      flash.clear

      # if you have rails_admin. You can redirect anywhere really
      redirect_to(authenticated_admins_root_path) && return
    end
    
    if current_user
      flash.clear

      # The authenticated root path can be defined in your routes.rb in: devise_scope :user do...
      redirect_to(root_path) && return
    end
  end
end
