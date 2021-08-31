class Api::V1::Fixtures::VirtualSoccer::PreMatchController < ApplicationController
  def index
    virtual = []
    @q =
      Fixture
        .joins(:market1_pre)
        .where(
          'fixtures.status = ? AND sport_id = ? AND fixtures.league_id IN (?) AND fixtures.start_date >= ? AND fixtures.start_date <= ? AND market1_pres.status = ?',
          'not_started',
          '6046',
          %w[37364 37386 38301 37814],
          Time.now,
          (Date.today.end_of_day + 1.days),
          'Active'
        )
        .order(start_date: :asc)

    @fixtures =
      @q.includes(:market1_pre).where('market1_pres.status = ?', 'Active')

    @fixtures.each do |event|
      ## convert  fixture to json
      fixture = event.as_json

      ## Add outcomes to the data
      fixture['outcome_1'] = event.market1_pre.outcome_1
      fixture['outcome_X'] = event.market1_pre.outcome_X
      fixture['outcome_2'] = event.market1_pre.outcome_2

      ## Add market status to the fixture
      fixture["market_status"] = event.market1_pre.status
      
      virtual.push(fixture)
    end
    render json: virtual
  end

  def show
    @fixture =
      Fixture
        .includes(
          :market1_pre,
          :market7_pre,
          :market3_pre,
          :market2_pre,
          :market17_pre
        )
        .find(params[:id]) 
    fixture = @fixture.as_json

    ## Add outcomes to the fixture
    fixture['outcome_mkt1_1'] = @fixture.market1_pre.outcome_1
    fixture['outcome_mkt1_X'] = @fixture.market1_pre.outcome_X
    fixture['outcome_mkt1_2'] = @fixture.market1_pre.outcome_2
    fixture['outcome_mkt7_1X'] = @fixture.market7_pre.outcome_1X
    fixture['outcome_mkt7_12'] = @fixture.market7_pre.outcome_12
    fixture['outcome_mkt7_X2'] = @fixture.market7_pre.outcome_X2
    fixture['outcome_mkt3_1'] = @fixture.market3_pre.outcome_1
    fixture['outcome_mkt3_2'] = @fixture.market3_pre.outcome_2
    fixture['outcome_mkt2_Under'] = @fixture.market2_pre.outcome_Under
    fixture['outcome_mkt2_Over'] = @fixture.market2_pre.outcome_Over
    fixture['outcome_mkt17_Yes'] = @fixture.market17_pre.outcome_Yes
    fixture['outcome_mkt17_No'] = @fixture.market17_pre.outcome_No

    render json: fixture
      
  end
end
