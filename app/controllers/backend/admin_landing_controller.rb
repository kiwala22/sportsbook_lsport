class Backend::AdminLandingController < ApplicationController
  before_action :authenticate_admin!

  layout "admin_application.html.erb"

  def index
  end
end
