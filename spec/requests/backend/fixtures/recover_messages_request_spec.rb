require 'rails_helper'

RSpec.describe "Backend::Fixtures::RecoverMessages", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/backend/fixtures/recover_messages/index"
      expect(response).to have_http_status(:success)
    end
  end

end
