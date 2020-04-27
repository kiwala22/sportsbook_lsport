require 'rails_helper'

RSpec.describe "BettingStatuses", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/betting_statuses/index"
      expect(response).to have_http_status(:success)
    end
  end

end
