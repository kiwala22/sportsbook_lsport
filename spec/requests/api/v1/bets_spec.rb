require 'rails_helper'

RSpec.describe "Api::V1::Bets", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/bets/index"
      expect(response).to have_http_status(:success)
    end
  end

end
