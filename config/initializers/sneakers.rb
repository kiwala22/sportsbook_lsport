require "sneakers"

Sneakers.configure( :heartbeat => 5,
   :amqp => 'amqp://s5X0wAgEmHCxDqrPnI:@mq.betradar.com:5672',
   :vhost => '/unifiedfeed/30819',
   :exchange => 'unifiedfeed',
   :exchange_type => :direct,
   :daemonize => true,          # Send to background
   :workers => 10,               # Number of per-cpu processes to run
   :log  => 'sneakers.log',     # Log file
   :pid_path => 'sneakers.pid', # Pid file
   :prefetch => 10,              # Grab 10 jobs together. Better speed.
   :threads => 10,               # Threadpool size (good to match prefetch)
   :env => ENV['RACK_ENV'],      # Environment
   :durable => true,             # Is queue durable?
   :ack => true,
)

Sneakers.logger.level = Logger::WARN
