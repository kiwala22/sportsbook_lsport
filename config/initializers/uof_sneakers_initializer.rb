require "sneakers"
begin
   Sneakers.configure   :heartbeat => 5,
                        :amqp => 'amqp://s5X0wAgEmHCxDqrPnI@stgmq.betradar.com:5671',
                        :vhost => '/unifiedfeed/30819',
                        :log  => '/var/www/html/sportsbook/shared/log/sneakers.log',     # Log file
                        :tls => true,
                        :verify_peer => false,
                        :verify_peer_name => false,
                        :allow_self_signed => true,
                        :ack => true,
                        :threads => 1, 
                        :workers => 1
   
   Sneakers.logger = Rails.logger
   Sneakers.logger.level = Logger::INFO
rescue Exception => e
   # bad, but otherwise precompile assets blow'allow_self_signed' => trues up in Docker
   Rails.logger.error(e.message)
end
