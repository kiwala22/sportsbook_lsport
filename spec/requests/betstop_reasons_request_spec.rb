require 'rails_helper'

RSpec.describe "BetstopReasons", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/betstop_reasons/index"
      expect(response).to have_http_status(:success)
    end
  end

end
