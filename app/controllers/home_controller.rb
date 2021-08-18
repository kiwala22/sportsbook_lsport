class HomeController < ApplicationController
	include CurrentCart
	before_action :set_cart
	
	def index
		
	end

	def page_refresh
		render :action => :index and return
	 end
end
