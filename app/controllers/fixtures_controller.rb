class FixturesController < ApplicationController

   def index
      if params[:q].present?
         @q = Fixture.ransack(params[:q])
      else
         params[:q] = {"scheduled_time_gteq": Time.now, "scheduled_time_eq": Date.today, "status_eq": "not_started"}
         @q = Fixture.ransack(params[:q])
      end
      
      #.includes(:market1_pre).where("scheduled_time >= ? AND scheduled_time = ? AND status = ?", Time.now, Date.today, "not_started" )
      @fixtures = @q.result.includes(:market1_pre)

      p "q: #{@q}"
      p "fixtures: #{@fixtures}"
   end

   def show
      
   end
   
   
end
