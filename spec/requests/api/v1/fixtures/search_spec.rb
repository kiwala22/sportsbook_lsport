require 'rails_helper'

RSpec.describe "Api::V1::Fixtures::Searches", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/v1/fixtures/search/index"
      expect(response).to have_http_status(:success)
    end
  end

end
