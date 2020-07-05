class Fixtures::Soccer::LiveMatchController < ApplicationController

   def index
      if params[:q].present?
         @q = Fixture.ransack(params[:q])
      else
         params[:q] = {"scheduled_time_gteq": Time.now, "scheduled_time_lteq": Date.today.end_of_day, "status_eq": "not_started", "sport_id_eq": "sr:sport:1", "category_id_not_eq": "sr:category:1033" }
         @q = Fixture.ransack(params[:q])
      end
      
      #.includes(:market1_pre).where("scheduled_time >= ? AND scheduled_time = ? AND status = ?", Time.now, Date.today, "not_started" )
      @fixtures = @q.result.includes(:market1_pre)

   end

   def show
      @fixture = Fixture.find(params[:id]).includes
   end
   
   
end