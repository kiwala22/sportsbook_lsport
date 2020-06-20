class Backend::BetstopReasonsController < ApplicationController
  before_action :authenticate_admin!


  layout "admin_application.html.erb"

  def index
    @betstop_reasons = BetstopReason.all.page params[:page]
  end
end
