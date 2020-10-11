class BunnyQueueService
   def self.logger
      Rails.logger.tagged('bunny') do
         @@logger ||= Rails.logger
      end
   end
   
   def self.connection
      @@connection ||= begin
         instance = Bunny.new(
            addresses: ENV['MTS_ADDRESSES'],
            username:  ENV['MTS_USER'],
            password:  ENV['MTS_PASSWORD'],
            vhost:     ENV['MTS_VHOST'],
            automatically_recover: true,
            heartbeat: 5,
            logger: 'log/bunny.log',
            log_level: 'INFO',
            tls: true,
            verify_peer: false,
            network_recovery_interval: 5.0
         )
         instance.start
         instance
      end
   end
   
   # ObjectSpace.define_finalizer(@@connection, proc { puts "Closing bunny connections"; BunnyQueueService.connection&.close })
end