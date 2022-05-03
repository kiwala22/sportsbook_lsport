require 'sidekiq'
class RecoveryWorker
   include Sidekiq::Worker
   sidekiq_options queue: "high"
   sidekiq_options retry: false

   include Recovery

   def perform(product)
      pull_latest_odds(product)
   end
end
