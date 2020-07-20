require 'rails_helper'

RSpec.describe "BetSlips", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/bet_slips/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/bet_slips/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /show" do
    it "returns http success" do
      get "/bet_slips/show"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/bet_slips/update"
      expect(response).to have_http_status(:success)
    end
  end

end
