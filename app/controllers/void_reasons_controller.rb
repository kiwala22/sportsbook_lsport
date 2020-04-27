class VoidReasonsController < ApplicationController
  before_action :authenticate_admin!


  layout "admin_application.html.erb"

  def index
    @void_reasons = VoidReason.all.page params[:page]
  end
end
