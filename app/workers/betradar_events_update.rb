class BetradarEventsUpdate
   include Sneakers::Worker
   QUEUE_NAME = :update_events
   from_queue QUEUE_NAME,
      :heartbeat => 5,
      :connection => Bunny.new(
         :host => "stgmq.betradar.com",
         :port => 5671,
         :user => ENV['BETRADAR_TOKEN'],
         :pass => "",
         :heartbeat => 5,
         :vhost => "/unifiedfeed/30819",
         :log_file => 'sneakers.log',
         :log_level => 'WARN'
      ),
      # :amqp => 'amqp://ANRL2tQf8N40oGQ4Ye:guest@mq.betradar.com:5672',
      # :vhost => '/unifiedfeed/30819',
      # :exchange => 'unifiedfeed',
      # :exchange_type => :direct,
      # :daemonize => true,
      # :workers => 10,
      # :log  => 'sneakers.log',
      # :pid_path => 'sneakers.pid',
      :prefetch => 10,
      :threads => 10,
      :env => ENV['RACK_ENV'],
      :durable => true,
      :ack => true
      #routing_key: 'ended',

   def work(message)
      response = JSON.parse(message, symbolize_names: true)
      log.ERROR(response)
      ack!
   end
end
