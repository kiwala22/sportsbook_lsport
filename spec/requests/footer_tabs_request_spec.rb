require 'rails_helper'

RSpec.describe "FooterTabs", type: :request do

  describe "GET /faqs" do
    it "returns http success" do
      get "/footer_tabs/faqs"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /rules" do
    it "returns http success" do
      get "/footer_tabs/rules"
      expect(response).to have_http_status(:success)
    end
  end

end
