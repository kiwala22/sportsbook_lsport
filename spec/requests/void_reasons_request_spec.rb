require 'rails_helper'

RSpec.describe "VoidReasons", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/void_reasons/index"
      expect(response).to have_http_status(:success)
    end
  end

end
