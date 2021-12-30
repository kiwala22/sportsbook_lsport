class Fixtures::Tennis::PreMatchController < ApplicationController
    include CurrentCart
    before_action :set_cart, only: %i[index show]

    def index;
    end


    def show
    end

end
