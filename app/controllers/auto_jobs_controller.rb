class AutoJobsController < ApplicationController
    before_action :authenticate_admin!, except: [:process_broadcasts, :check_signup_bonuses, :check_first_deposit_bonuses, :check_slip_bonuses]
    skip_before_action :verify_authenticity_token

   def process_broadcasts
      jobs = Broadcast.where('status = ? AND execution_time <= ?', "PENDING", Time.now)
      if !jobs.empty?
         jobs.each do |job|
            ##update status and push to worker
            job.update(status:"PROCESSING")
            BroadcastsWorker.perform_async(job.id)
         end
      end
   end

   def check_signup_bonuses
      ##Find bonuses whose status is still Active but have actually expired
      bonuses = SignUpBonus.where('status = ? AND expiry <= ?', "Active", Time.now)

      if !bonuses.empty?
         bonuses.each do |bonus|
         ##Update each bonus to status == Expired
         bonus.update(status: "Expired")
         end
      end
      render body: nil
   end

   def check_first_deposit_bonuses
      ##Find bonuses whose status is still Active but have actually expired
      bonuses = TopUpBonus.where('status = ? AND expiry <= ?', "Active", Time.now)

      if !bonuses.empty?
         bonuses.each do |bonus|
         ##Update each bonus to status == Expired
         bonus.update(status: "Expired")
         end
      end
      render body: nil
   end

   def check_slip_bonuses
      ##Find bonuses whose status is still Active but have actually expired
      bonuses = SlipBonus.where('status = ? AND expiry <= ?', "Active", Time.now)

      if !bonuses.empty?
         bonuses.each do |bonus|
         ##Update each bonus to status == Expired
         bonus.update(status: "Expired")
         end
      end
      render body: nil
   end
end
