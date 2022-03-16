desc "Run Fixture Update Code"
task pull_fixture: :environment do
   date_today = Date.today.strftime("%F").to_time.to_i

   date_three = (Date.today + 3.day).strftime("%F").to_time.to_i
   
   sportsIds = ["6046", "48242", "54094"]
   
   #Fetching fixtures for all the 3 sport types
   sportsIds.each do |sport|
        fixture_today = Fixture.new.fetch_fixtures(date_today, date_three, sport)
   end
   
end
