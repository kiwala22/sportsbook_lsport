class Api::V1::Fixtures::Tennis::LiveMatchController < ApplicationController
    def index
        @lives = []
        @q = Fixture.joins(:live_markets).where(
          'fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND live_markets.market_identifier = ? AND live_markets.status = ?',
          'live',
          '54094',
          %w[37364 37386 38301 37814],
          '1',
          'Active'
        ).order(start_date: :asc)
    
        @fixtures =
          @q.includes(:live_markets)
          .where('live_markets.status = ? AND live_markets.market_identifier =?', 'Active', '1')
    
        @fixtures.each do |event|
          ## find Market 1X2
          market = event.live_markets.where(market_identifier: 1)
    
          ## convert  fixture to json
          fixture = event.as_json
    
          ## Add outcomes to the data
          fixture["markets"] = market
    
          @lives.push(fixture)
        end
        render json: @lives
      end
    
      def show
        @fixture = Fixture.includes(:live_markets).find(params[:id])
    
        fixture = @fixture.as_json
    
        ## Add all available markets to fixture data
        markets = @fixture.live_markets.order('market_identifier::integer ASC, specifier')
    
        fixture["markets"] = markets
    
        render json: fixture
      end
end
