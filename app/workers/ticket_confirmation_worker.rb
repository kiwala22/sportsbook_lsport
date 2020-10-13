require 'sidekiq'
class TicketConfirmationWorker
  include Sidekiq::Worker
  sidekiq_options queue: "critical"
  sidekiq_options retry: false

  def perform(message, routing_key)

  end
end