class BunnyQueueService
   def self.logger
      Rails.logger.tagged('bunny') do
         @@logger ||= Rails.logger
      end
   end
   
   def self.connection
      @@connection ||= begin
         instance = Bunny.new(
            addresses: ENV['MTS_ADDRESSES'].split(','),
            username:  ENV['MTS_USER'],
            password:  ENV['MTS_PASSWORD'],
            vhost:     ENV['MTS_VHOST'],
            automatically_recover: true,
            connection_timeout: 2,
            continuation_timeout: (ENV['BUNNY_CONTINUATION_TIMEOUT'] || 10_000).to_i,
            logger: BunnyQueueService.logger
         )
         instance.start
         instance
      end
   end
   
   ObjectSpace.define_finalizer(RailsMessageQueue::Application, proc { puts "Closing bunny connections"; BunnyQueueService.connection&.close })
end