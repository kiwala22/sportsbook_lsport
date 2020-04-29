require 'rails_helper'

RSpec.describe "Fixtures", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/fixtures/index"
      expect(response).to have_http_status(:success)
    end
  end

end
