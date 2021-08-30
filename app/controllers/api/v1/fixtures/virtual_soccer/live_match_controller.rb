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
      virtual.push(fixture)
    end
    render json: virtual
  end
end
