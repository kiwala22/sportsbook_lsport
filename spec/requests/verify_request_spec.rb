require 'rails_helper'

RSpec.describe "Verifies", type: :request do

  describe "GET /new" do
    it "returns http success" do
      get "/verify/new"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /create" do
    it "returns http success" do
      get "/verify/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /update" do
    it "returns http success" do
      get "/verify/update"
      expect(response).to have_http_status(:success)
    end
  end

end
