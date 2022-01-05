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
      @q = Fixture.joins(:pre_markets).where(
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

      market = event.pre_markets.where(market_identifier: 1)

      ## Add outcomes to the data
      fixture["markets"] = market

      ## Add market status to the fixture
      # fixture["market_#{market.market_identifier}_status"] = market.status

      @prematch.push(fixture)
    end
    render json: @prematch
  end

  def show
    @fixture = Fixture.includes(:pre_markets).find(params[:id])

    fixture = @fixture.as_json

    ## Add all available markets to fixture data
    markets = @fixture.pre_markets.order('market_identifier::integer ASC')

    filtered_markets = []

    ## Filter the markets to the specifics needed
    markets.each do |market|
      if ["2", "21", "45"].include?(market["market_identifier"])
        if market["specifier"] == "2.5"
          filtered_markets << market
        end

      elsif ["3"].include?(market["market_identifier"])
        if market["specifier"] == "-1.0 (0-0)"
          filtered_markets << market
        end

      elsif ["13", "61"].include?(market["market_identifier"])
        if market["specifier"] == "1:0"
          filtered_markets << market
        end
      else
        filtered_markets << market
      end
    end


    fixture["markets"] = filtered_markets

    render json: fixture
      
  end
end