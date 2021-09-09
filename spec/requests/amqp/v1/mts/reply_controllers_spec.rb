require 'rails_helper'

RSpec.describe "Amqp::V1::Mts::ReplyControllers", type: :request do
  describe "GET /amqp/v1/mts/reply_controllers" do
    message = {"result"=>{"ticketId"=>"150", "status"=>"accepted", "reason"=>{"code"=>1024, "message"=>"Ticket accepted"}, "betDetails"=>[]}, "version"=>"2.3", "signature"=>"Itzm0J3l4PmfGL+BfKE0Q2EF8wpu4A1ha56jYVkuZfU=", "exchangeRate"=>44101068}
    before {post '/amqp/v1/mts/reply', params: { routing_key: "node202.ticket.confirm", payload: message.to_json } , headers: {access_token: "k/GV8prBUWE5D8JEreycbgT+"}}

    it "retruns status 200 on success" do
      expect(response).to have_http_status(200)
   end

   it "increases ticket worker count by 1" do
     assert_equal 1, TicketReplyWorker.jobs.size
   end
  end

  describe "GET amqp/v1/mts/confirm without parameters" do
    
    it "fails when request has no parameters" do
      post '/amqp/v1/mts/reply'
      expect(response).to have_http_status(400)
    end
  end
end
