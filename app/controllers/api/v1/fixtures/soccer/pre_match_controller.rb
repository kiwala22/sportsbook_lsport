class Api::V1::Fixtures::Soccer::PreMatchController < ApplicationController
  def index
    if params[:q].present?
      parameters = [
        "fixtures.status= 'not_started'",
        "fixtures.sport_id='6046'",
        "fixtures.league_id NOT IN ('37364', '37386', '38301', '37814')",
        "pre_markets.status = 'Active'",
        "pre_markets.market_identifier = '1'",
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
      @q =
      Fixture
        .joins(:pre_markets)
        .where(
          'fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id NOT IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND pre_markets.status = ? AND pre_markets.market_identifier = ?',
          'not_started',
          '6046',
          %w[37364 37386 38301 37814],
          (Time.now),
          (Date.today.end_of_day + 10.months),
          'Active',
          '1'
        ).order(start_date: :asc)
    end

    @prematch = []

    @fixtures = @q.includes(:pre_markets).where('pre_markets.status = ? AND pre_markets.market_identifier = ?', 'Active','1' )
    @fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture["market_#{event.pre_market.market_identifier}_odds"] = event.pre_market.odds

      ## Add market status to the fixture
      fixture["market_#{event.pre_market.market_identifier}_status"] = event.pre_market.status

      @prematch.push(fixture)
    end
    render json: @prematch
  end

  def show
    @fixture =Fixture.includes(:pre_markets).find(params[:id])

    ##Required Markets
    markets = [1, 2, 3, 7, 17]

    fixture = @fixture.as_json
    
    ## Add outcomes and market statuses to the fixture
    markets.each do |market_identifier|
      ## Add outcomes to the data
      fixture["market_#{market_identifier}_odds"] = @fixture.pre_market.where(market_identifier: market_identifier).odds

      ## Add market status to the fixture
      fixture["market_#{market_identifier}_status"] = @fixture.pre_market.where(market_identifier: market_identifier).status
    end

    render json: fixture
      
  end
end