desc "Run Fixture Update Code"
task pull_fixture: :environment do
   date_today = Date.today.strftime("%F").to_time.to_i
   # date_one = (Date.today + 1.day).strftime("%F")
   # date_two = (Date.today + 2.day).strftime("%F")
   date_three = (Date.today + 3.day).strftime("%F").to_time.to_i

   fixture_today = Fixture.new.fetch_fixtures(date_today, date_three)
   # fixture_one =   Fixture.new.fetch_fixtures(date_one)
   # fixture_two =   Fixture.new.fetch_fixtures(date_two)
   # fixture_two =   Fixture.new.fetch_fixtures(date_three)
end
