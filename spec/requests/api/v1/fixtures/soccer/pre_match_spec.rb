require 'rails_helper'

RSpec.describe "Api::V1::Fixtures::Soccer::PreMatches", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/fixtures/soccer/pre_match/index"
      expect(response).to have_http_status(:success)
    end
  end

end
