module Namings
    include MarketNames

    def market_namings
        PreMarket.all.each do |market|
            if market.name.nil?
                market.update(name: market_name(market.market_identifier))
            end
        end
    end
end