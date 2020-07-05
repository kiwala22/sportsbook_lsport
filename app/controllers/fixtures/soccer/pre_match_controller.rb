class Fixtures::Soccer::PreMatchController < ApplicationController

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
      @fixture = Fixture.includes(:market1_pre,:market10_pre,:market16_pre,:market18_pre,:market29_pre, :market60_pre,:market63_pre,:market1_pre,:market66_pre,:market68_pre,:market75_pre).find(params[:id])
   end
   
   
end