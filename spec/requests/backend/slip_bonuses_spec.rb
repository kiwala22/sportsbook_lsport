require 'rails_helper'

RSpec.describe "Backend::SlipBonuses", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/backend/slip_bonuses/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /new" do
    it "returns http success" do
      get "/backend/slip_bonuses/new"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/backend/slip_bonuses/create"
      expect(response).to have_http_status(:success)
    end
  end

end
