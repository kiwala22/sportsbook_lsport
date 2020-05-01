class BetradarEventsUpdate
   include Sneakers::Worker
   QUEUE_NAME = :update_events
   from_queue QUEUE_NAME,
   :heartbeat => 5,
   :connection => Bunny.new(
      host: 'stgmq.betradar.com',
      vhost: '/unifiedfeed/30819',
      port: 5671,
      user: 's5X0wAgEmHCxDqrPnI',
      password: "",
      ssl: true,
      verify_peer: false,
      verify_peer_name: false,
      allow_self_signed: true
   ),

   # :amqp => 'amqp://ANRL2tQf8N40oGQ4Ye:guest@mq.betradar.com:5672',
   # :vhost => '/unifiedfeed/30819',
   :exchange => 'unifiedfeed',
   :exchange_type => :direct,
   :daemonize => true,
   :workers => 10,
   :log  => 'sneakers.log',
   :pid_path => 'sneakers.pid',
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
