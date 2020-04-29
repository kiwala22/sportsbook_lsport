class FixturesController < ApplicationController
  before_action :authenticate_admin!


  layout "admin_application.html.erb"

  def index
    @fixtures = Fixture.all.page params[:page]
  end
end
