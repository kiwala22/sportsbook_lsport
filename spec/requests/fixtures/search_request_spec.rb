require 'rails_helper'

RSpec.describe "Fixtures::Searches", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/fixtures/search/index"
      expect(response).to have_http_status(:success)
    end
  end

end
