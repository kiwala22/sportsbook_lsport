class CreateSoccerFixtures < ActiveRecord::Migration[6.0]
  def change
    create_table :soccer_fixtures do |t|
      t.string :event_id
      t.timestamp :scheduled_time
      t.string :live_odds
      t.string :status
      t.string :tournament_round
      t.string :betradar_id
      t.integer :season_id
      t.string :season_name
      t.integer :tournament_id
      t.string :tournament_name
      t.string :sport_id
      t.string :sport
      t.string :category_id
      t.string :category
      t.string :comp_one_id
      t.string :comp_one_name
      t.string :comp_one_gender
      t.string :comp_one_abb
      t.string :comp_one_qualifier
      t.string :comp_two_id
      t.string :comp_two_name
      t.string :comp_two_gender
      t.string :comp_two_abb
      t.string :comp_two_qualifier

      t.string :pre_1x2_ht_status, default: "closed"
      t.string :pre_1x2_ft_status, default: "closed"
      t.string :live_1x2_ht_status, default: "closed"
      t.string :live_1x2f_t_status, default: "closed"
      t.string :pre_dc_ht_status, default: "closed"
      t.string :pre_dc_ft_status, default: "closed"
      t.string :live_dc_ht_status, default: "closed"
      t.string :live_dc_ft_status, default: "closed"
      t.string :pre_total25_ht_status, default: "closed"
      t.string :pre_total25_ft_status, default: "closed"
      t.string :live_total25_ht_status, default: "closed"
      t.string :live_total25_ft_status, default: "closed"
      t.string :pre_bs_ht_status, default: "closed"
      t.string :pre_bs_ft_status, default: "closed"
      t.string :live_bs_ht_status, default: "closed"
      t.string :live_bs_ft_status, default: "closed"
      t.string :pre_hc1_ht_status, default: "closed"
      t.string :pre_hc1_ft_status, default: "closed"
      t.string :live_hc1_ht_status, default: "closed"
      t.string :live_hc1_ft_status, default: "closed"

      t.string :pre_1x2_ht_1
      t.string :pre_1x2_ht_x
      t.string :pre_1x2_ht_2
      t.string :pre_1x2_ft_1
      t.string :pre_1x2_ft_x
      t.string :pre_1x2f_t_2
      t.string :live_1x2_ht_1
      t.string :live_1x2_ht_x
      t.string :live_1x2_ht_2
      t.string :live_1x2_ft_1
      t.string :live_1x2_ft_x
      t.string :live_1x2_ft_2

      t.string :pre_total25_ht_under
      t.string :pre_total25_ht_over
      t.string :pre_total25_ft_under
      t.string :pre_total25_ft_over
      t.string :live_total25_ht_under
      t.string :live_total25_ht_over
      t.string :live_total25_ft_under
      t.string :live_total25_ft_over

      t.string :pre_bs_ft_yes
      t.string :pre_bs_ft_no
      t.string :live_bs_ft_yes
      t.string :live_bs_ft_no
      t.string :pre_bs_ht_yes
      t.string :pre_bs_ht_no
      t.string :live_bs_ht_yes
      t.string :live_bs_ht_no

      t.string :pre_hc1_ht_1
      t.string :pre_hc1_ht_x
      t.string :pre_hc1_ht_2
      t.string :pre_hc1_ft_1
      t.string :pre_hc1_ft_x
      t.string :pre_hc1_ft_2
      t.string :live_hc1_ht_1
      t.string :live_hc1_ht_x
      t.string :live_hc1_ht_2
      t.string :live_hc1_ft_1
      t.string :live_hc1_ft_x
      t.string :live_hc1_ft_2

      t.timestamps
    end
  end
end
