require 'sidekiq'
class CableWorker
   include Sidekiq::Worker
   sidekiq_options queue: "critical"
   sidekiq_options retry: 1
   
   def perform(channel,data)
      ActionCable.server.broadcast(channel, data)
   end
end