class Api::V1::Fixtures::VirtualSoccer::LiveMatchController < ApplicationController
  def index
    virtual = []
    @q =
      Fixture
        .joins(:market1_live)
        .where(
          'fixtures.status = ? AND fixtures.sport_id = ? AND fixtures.league_id IN (?) AND market1_lives.status = ? ',
          'live',
          '6046',
          %w[37364 37386 38301 37814],
          'Active'
        )
        .order(start_date: :asc)

    @fixtures =
      @q.includes(:market1_live).where('market1_lives.status = ?', 'Active')

    @fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture['outcome_1'] = event.market1_live.outcome_1
      fixture['outcome_X'] = event.market1_live.outcome_X
      fixture['outcome_2'] = event.market1_live.outcome_2

      ## Add market status to the fixture
      fixture["market_status"] = event.market1_live.status
      
      virtual.push(fixture)
    end
    render json: virtual
  end

  def show
    @fixture =
    Fixture
      .includes(
        :market1_live,
        :market7_live,
        :market3_live,
        :market2_live,
        :market17_live
      )
      .find(params[:id])
    
    ## Add outcomes to the fixture
    fixture['outcome_mkt1_1'] = @fixture.market1_live.outcome_1
    fixture['outcome_mkt1_X'] = @fixture.market1_live.outcome_X
    fixture['outcome_mkt1_2'] = @fixture.market1_live.outcome_2
    fixture['outcome_mkt7_1X'] = @fixture.market7_live.outcome_1X
    fixture['outcome_mkt7_12'] = @fixture.market7_live.outcome_12
    fixture['outcome_mkt7_X2'] = @fixture.market7_live.outcome_X2
    fixture['outcome_mkt3_1'] = @fixture.market3_live.outcome_1
    fixture['outcome_mkt3_2'] = @fixture.market3_live.outcome_2
    fixture['outcome_mkt2_Under'] = @fixture.market2_live.outcome_Under
    fixture['outcome_mkt2_Over'] = @fixture.market2_live.outcome_Over
    fixture['outcome_mkt17_Yes'] = @fixture.market17_live.outcome_Yes
    fixture['outcome_mkt17_No'] = @fixture.market17_live.outcome_No

    render json: fixture
  end
end
