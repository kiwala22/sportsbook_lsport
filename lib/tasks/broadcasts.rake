desc "Send Scheduled Broadcast Messages"
task send_broadcasts: :environment do

  # scheduled_sms = AutoJobsController.new
  # scheduled_sms.process_broadcasts
  jobs = Broadcast.where('status = ? ', 'PENDING')
      if !jobs.empty?
         jobs.each do |job|
            if job.execution_time <= Time.now.strftime("%Y-%m-%d %H:%M:%S %p")
               ##update status and push to worker
               job.update(status:"PROCESSING")
               BroadcastsWorker.perform_async(job.id)
            end
         end
      end
end