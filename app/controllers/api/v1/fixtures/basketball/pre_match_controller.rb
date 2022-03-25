class Api::V1::Fixtures::Basketball::PreMatchController < ApplicationController
    def index
      if params[:q].present?
        parameters = [
          "fixtures.status= 'not_started'",
          "fixtures.sport_id='48242'",
          "pre_markets.status = 'Active'",
          "pre_markets.market_identifier = '226'",
          "fixtures.start_date >= '#{Time.now}'"
        ]
        if params[:q][:league_name].present?
          parameters << "fixtures.league_name='#{params[:q][:league_name]}'"
        end
        if params[:q][:location].present?
          parameters << "fixtures.location='#{params[:q][:location]}'"
        end
        conditions = parameters.join(' AND ')
        @q = Fixture.joins(:pre_markets).where(conditions).order(start_date: :asc)
      else
        @q = Fixture.joins(:pre_markets).where(
          'fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND pre_markets.status = ? AND pre_markets.market_identifier = ?',
          'not_started',
          '48242',
          (Time.now),
          (Date.today.end_of_day + 2.days), #production
          # (Date.today.end_of_day + 10.months), #development
          'Active',
          '226'
        ).order(start_date: :asc)
      end
  
      upcoming = []
  
      @fixtures = @q.includes(:pre_markets).where('pre_markets.status = ? AND pre_markets.market_identifier = ?', 'Active','226' )
  
      @fixtures.each do |event|
        ## convert  fixture to json
        fixture = event.as_json
  
        market = event.pre_markets.where(market_identifier: 226)
  
        ## Add outcomes to the data
        fixture["markets"] = market
  
        upcoming.push(fixture)
      end
      render json: upcoming
    end

    def show
      @fixture = Fixture.includes(:pre_markets).find(params[:id])
  
      fixture = @fixture.as_json
  
      ## Add all available markets to fixture data
      markets = @fixture.pre_markets.where("market_identifier IN (?) AND status = ?", ["2", "3", "226", "63", "53", "28", "21", "342", "282"], "Active").order('market_identifier::integer ASC')
  
      fixture["markets"] = markets
  
      render json: fixture
        
    end
    
end
