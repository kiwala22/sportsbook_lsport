# class MtsMessagesWorker
#    include Sneakers::Worker
#    QUEUE_NAME = ""
   
#    from_queue QUEUE_NAME,
#    exchange: 'unifiedfeed',
#    # exchange_type: :topic,
#    :exchange_options => {
#       :type => :topic,
#       :durable => true,
#       :passive => true,
#       :auto_delete => false,
#    },
#    :queue_options => {
#       # :durable => false,
#       # :auto_delete => false,
#       # :exclusive => true,
#       # :passive => true
#    },
#    routing_key: ['','']
#    heartbeat: 5

#    def work(message)
#       data = Hash.from_xml(message)
#       puts data
#       ack!
#    rescue StandardError => e
#       puts(false, data, message: e.message)
#       reject!
#    end
# end

