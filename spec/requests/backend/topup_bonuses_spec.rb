require 'rails_helper'

RSpec.describe "Backend::TopupBonuses", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/backend/topup_bonuses/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /new" do
    it "returns http success" do
      get "/backend/topup_bonuses/new"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/backend/topup_bonuses/create"
      expect(response).to have_http_status(:success)
    end
  end

end
