FactoryBot.define do
   factory :fixture do
      event_id { "sr:match:23218423"}
      scheduled_time { Time.now + 2.hours}
      live_odds { "not_available"}
      status { "ended"}
      tournament_round { "League Two"}
      betradar_id { "84"}
      season_id { 0}
      season_name { "League Two 20/21"}
      tournament_id { "sr:tournament:25"}
      tournament_name { "League Two"}
      sport_id { "sr:sport:1"}
      sport { "Soccer"}
      category_id { "sr:category:1"}
      category { "England"}
      comp_one_id { "sr:competitor:63"}
      comp_one_name { "Cambridge United"}
      comp_one_gender { "male"}
      comp_one_abb { "CAM"}
      comp_one_qualifier { "home"}
      comp_two_id { "sr:competitor:55"}
      comp_two_name { "Port Vale"}
      comp_two_gender { "male"}
      comp_two_abb { "PVA"}
      comp_two_qualifier { "away"}
      home_score { nil}
      away_score { nil}
      match_status { "0"}
      booked { false}
      priority { nil}
      match_time { nil}
      featured { false}
   end
end