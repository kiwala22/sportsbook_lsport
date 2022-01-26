class AutoJobsController < ApplicationController
    before_action :authenticate_admin!, except: [:process_broadcasts]
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
end
