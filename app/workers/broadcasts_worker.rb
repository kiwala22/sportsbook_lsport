require 'sidekiq'
class BroadcastsWorker
    include Sidekiq::Worker
    sidekiq_options queue: "default"
    sidekiq_options retry: false
    
    def perform(broadcast_id)
        sender_id = ENV['DEFAULT_SENDER_ID']
        @broadcast = Broadcast.find(broadcast_id)  
            # bet and user query
        @bets = Bet.distinct.where("created_at >= ? AND created_at <= ?", @broadcast.start_date, @broadcast.end_date).pluck(:user_id)
        user_array = @bets   
        contacts = user_array.length
        user_array.each do |uniq_user|
            user = User.find(uniq_user)
            message ="Hi "+ user.first_name + ", " + @broadcast.message
            
            #send the message to message library through sms worker
            SmsWorker.perform_async(user.phone_number, message, sender_id)
        end
        @broadcast.update(contacts: contacts, status: "SUCCESS")
        
    end
end