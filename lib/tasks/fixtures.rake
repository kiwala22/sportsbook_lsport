desc "Run Fixture Update Code"
task pull_fixture: :environment do
   date_today = Date.today.strftime("%F")
   date_one = (Date.today + 1.day).strftime("%F")
   date_two = (Date.today + 2.day).strftime("%F")

   fixture_today = Fixture.new.fetch_fixtures(date_today)
   fixture_one =   Fixture.new.fetch_fixtures(date_one)
   fixture_two =   Fixture.new.fetch_fixtures(date_two)
end
