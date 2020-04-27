require 'rails_helper'

RSpec.describe "MatchStatuses", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/match_statuses/index"
      expect(response).to have_http_status(:success)
    end
  end

end
