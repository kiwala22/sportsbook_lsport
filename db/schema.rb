# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_10_13_200442) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "admins", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "first_name"
    t.string "last_name"
    t.index ["email"], name: "index_admins_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admins_on_reset_password_token", unique: true
  end

  create_table "api_users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "api_id"
    t.string "api_key"
    t.boolean "registered", default: false
    t.string "user_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "bet_slips", force: :cascade do |t|
    t.integer "bet_count"
    t.decimal "stake", precision: 12, scale: 2
    t.decimal "win_amount", precision: 12, scale: 2, default: "0.0"
    t.decimal "odds", precision: 10, scale: 2
    t.decimal "potential_win_amount", precision: 12, scale: 2
    t.string "status"
    t.boolean "paid", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.string "result"
    t.index ["user_id"], name: "index_bet_slips_on_user_id"
  end

  create_table "bets", force: :cascade do |t|
    t.decimal "odds", precision: 5, scale: 2
    t.string "status"
    t.string "product"
    t.string "reason"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.bigint "fixture_id", null: false
    t.bigint "bet_slip_id", null: false
    t.bigint "outcome_id", null: false
    t.bigint "market_id", null: false
    t.string "result"
    t.decimal "void_factor", precision: 5, scale: 2
    t.string "outcome_desc"
    t.index ["bet_slip_id"], name: "index_bets_on_bet_slip_id"
    t.index ["fixture_id"], name: "index_bets_on_fixture_id"
    t.index ["market_id"], name: "index_bets_on_market_id"
    t.index ["outcome_id"], name: "index_bets_on_outcome_id"
    t.index ["user_id"], name: "index_bets_on_user_id"
  end

  create_table "betstop_reasons", force: :cascade do |t|
    t.integer "betstop_reason_id"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "betting_statuses", force: :cascade do |t|
    t.integer "betting_status_id"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "carts", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "deposits", force: :cascade do |t|
    t.decimal "amount", precision: 12, scale: 2
    t.string "network"
    t.string "payment_method"
    t.decimal "balance_before", precision: 12, scale: 2
    t.decimal "balance_after", precision: 12, scale: 2
    t.string "ext_transaction_id"
    t.string "transaction_id"
    t.string "resource_id"
    t.string "receiving_fri"
    t.string "status"
    t.string "message"
    t.string "currency"
    t.string "phone_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.string "transaction_reference"
    t.index ["ext_transaction_id"], name: "index_deposits_on_ext_transaction_id", unique: true
    t.index ["phone_number"], name: "index_deposits_on_phone_number"
    t.index ["resource_id"], name: "index_deposits_on_resource_id", unique: true
    t.index ["transaction_id"], name: "index_deposits_on_transaction_id", unique: true
    t.index ["user_id"], name: "index_deposits_on_user_id"
  end

  create_table "fixtures", force: :cascade do |t|
    t.string "event_id"
    t.datetime "scheduled_time"
    t.string "live_odds"
    t.string "status"
    t.string "tournament_round"
    t.string "betradar_id"
    t.integer "season_id"
    t.string "season_name"
    t.string "tournament_id"
    t.string "tournament_name"
    t.string "sport_id"
    t.string "sport"
    t.string "category_id"
    t.string "category"
    t.string "comp_one_id"
    t.string "comp_one_name"
    t.string "comp_one_gender"
    t.string "comp_one_abb"
    t.string "comp_one_qualifier"
    t.string "comp_two_id"
    t.string "comp_two_name"
    t.string "comp_two_gender"
    t.string "comp_two_abb"
    t.string "comp_two_qualifier"
    t.string "home_score"
    t.string "away_score"
    t.string "match_status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "booked", default: false
    t.string "priority"
    t.string "match_time"
    t.boolean "featured", default: false
    t.index ["booked"], name: "index_fixtures_on_booked"
    t.index ["category"], name: "index_fixtures_on_category"
    t.index ["category_id"], name: "index_fixtures_on_category_id"
    t.index ["event_id"], name: "index_fixtures_on_event_id", unique: true
    t.index ["match_status"], name: "index_fixtures_on_match_status"
    t.index ["scheduled_time"], name: "index_fixtures_on_scheduled_time"
    t.index ["sport"], name: "index_fixtures_on_sport"
    t.index ["sport_id"], name: "index_fixtures_on_sport_id"
    t.index ["status"], name: "index_fixtures_on_status"
  end

  create_table "line_bets", force: :cascade do |t|
    t.bigint "cart_id", null: false
    t.bigint "fixture_id", null: false
    t.decimal "odd", precision: 5, scale: 2
    t.string "description"
    t.string "market"
    t.string "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["cart_id"], name: "index_line_bets_on_cart_id"
    t.index ["fixture_id"], name: "index_line_bets_on_fixture_id"
  end

  create_table "market10_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_9", precision: 6, scale: 2
    t.decimal "outcome_10", precision: 6, scale: 2
    t.decimal "outcome_11", precision: 6, scale: 2
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market10_lives_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market10_lives_on_fixture_id"
    t.index ["status"], name: "index_market10_lives_on_status"
  end

  create_table "market10_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_9", precision: 6, scale: 2
    t.decimal "outcome_10", precision: 6, scale: 2
    t.decimal "outcome_11", precision: 6, scale: 2
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market10_pres_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market10_pres_on_fixture_id"
    t.index ["status"], name: "index_market10_pres_on_status"
  end

  create_table "market16_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_1714", precision: 6, scale: 2
    t.decimal "outcome_1715", precision: 6, scale: 2
    t.integer "hcp"
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market16_lives_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market16_lives_on_fixture_id"
    t.index ["status"], name: "index_market16_lives_on_status"
  end

  create_table "market16_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_1714", precision: 6, scale: 2
    t.decimal "outcome_1715", precision: 6, scale: 2
    t.integer "hcp"
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market16_pres_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market16_pres_on_fixture_id"
    t.index ["status"], name: "index_market16_pres_on_status"
  end

  create_table "market18_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_12", precision: 6, scale: 2
    t.decimal "outcome_13", precision: 6, scale: 2
    t.string "status"
    t.decimal "total", precision: 5, scale: 2
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market18_lives_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market18_lives_on_fixture_id"
    t.index ["status"], name: "index_market18_lives_on_status"
  end

  create_table "market18_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_12", precision: 6, scale: 2
    t.decimal "outcome_13", precision: 6, scale: 2
    t.string "status"
    t.decimal "total", precision: 5, scale: 2
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market18_pres_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market18_pres_on_fixture_id"
    t.index ["status"], name: "index_market18_pres_on_status"
  end

  create_table "market1_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_1", precision: 6, scale: 2
    t.decimal "outcome_2", precision: 6, scale: 2
    t.decimal "outcome_3", precision: 6, scale: 2
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market1_lives_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market1_lives_on_fixture_id"
    t.index ["status"], name: "index_market1_lives_on_status"
  end

  create_table "market1_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_1", precision: 6, scale: 2
    t.decimal "outcome_2", precision: 6, scale: 2
    t.decimal "outcome_3", precision: 6, scale: 2
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market1_pres_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market1_pres_on_fixture_id"
    t.index ["status"], name: "index_market1_pres_on_status"
  end

  create_table "market29_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_74", precision: 6, scale: 2
    t.decimal "outcome_76", precision: 6, scale: 2
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market29_lives_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market29_lives_on_fixture_id"
    t.index ["status"], name: "index_market29_lives_on_status"
  end

  create_table "market29_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_74", precision: 6, scale: 2
    t.decimal "outcome_76", precision: 6, scale: 2
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market29_pres_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market29_pres_on_fixture_id"
    t.index ["status"], name: "index_market29_pres_on_status"
  end

  create_table "market60_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_1", precision: 6, scale: 2
    t.decimal "outcome_2", precision: 6, scale: 2
    t.decimal "outcome_3", precision: 6, scale: 2
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market60_lives_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market60_lives_on_fixture_id"
    t.index ["status"], name: "index_market60_lives_on_status"
  end

  create_table "market60_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_1", precision: 6, scale: 2
    t.decimal "outcome_2", precision: 6, scale: 2
    t.decimal "outcome_3", precision: 6, scale: 2
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market60_pres_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market60_pres_on_fixture_id"
    t.index ["status"], name: "index_market60_pres_on_status"
  end

  create_table "market63_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_9", precision: 6, scale: 2
    t.decimal "outcome_10", precision: 6, scale: 2
    t.decimal "outcome_11", precision: 6, scale: 2
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market63_lives_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market63_lives_on_fixture_id"
    t.index ["status"], name: "index_market63_lives_on_status"
  end

  create_table "market63_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_9", precision: 6, scale: 2
    t.decimal "outcome_10", precision: 6, scale: 2
    t.decimal "outcome_11", precision: 6, scale: 2
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market63_pres_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market63_pres_on_fixture_id"
    t.index ["status"], name: "index_market63_pres_on_status"
  end

  create_table "market66_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_1714", precision: 6, scale: 2
    t.decimal "outcome_1715", precision: 6, scale: 2
    t.integer "hcp"
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market66_lives_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market66_lives_on_fixture_id"
    t.index ["status"], name: "index_market66_lives_on_status"
  end

  create_table "market66_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_1714", precision: 6, scale: 2
    t.decimal "outcome_1715", precision: 6, scale: 2
    t.integer "hcp"
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market66_pres_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market66_pres_on_fixture_id"
    t.index ["status"], name: "index_market66_pres_on_status"
  end

  create_table "market68_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_12", precision: 6, scale: 2
    t.decimal "outcome_13", precision: 6, scale: 2
    t.string "status"
    t.decimal "total", precision: 5, scale: 2
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market68_lives_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market68_lives_on_fixture_id"
    t.index ["status"], name: "index_market68_lives_on_status"
  end

  create_table "market68_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_12", precision: 6, scale: 2
    t.decimal "outcome_13", precision: 6, scale: 2
    t.string "status"
    t.decimal "total", precision: 5, scale: 2
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market68_pres_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market68_pres_on_fixture_id"
    t.index ["status"], name: "index_market68_pres_on_status"
  end

  create_table "market75_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_74", precision: 6, scale: 2
    t.decimal "outcome_76", precision: 6, scale: 2
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market75_lives_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market75_lives_on_fixture_id"
    t.index ["status"], name: "index_market75_lives_on_status"
  end

  create_table "market75_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "outcome_74", precision: 6, scale: 2
    t.decimal "outcome_76", precision: 6, scale: 2
    t.string "status"
    t.string "void_reason"
    t.json "outcome"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "fixture_id", null: false
    t.json "specifier"
    t.index ["event_id"], name: "index_market75_pres_on_event_id", unique: true
    t.index ["fixture_id"], name: "index_market75_pres_on_fixture_id"
    t.index ["status"], name: "index_market75_pres_on_status"
  end

  create_table "market_alerts", force: :cascade do |t|
    t.bigint "timestamp"
    t.integer "product"
    t.integer "subscribed"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "status", default: false
    t.index ["product"], name: "index_market_alerts_on_product"
    t.index ["subscribed"], name: "index_market_alerts_on_subscribed"
    t.index ["timestamp"], name: "index_market_alerts_on_timestamp"
  end

  create_table "markets", force: :cascade do |t|
    t.integer "market_id"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "match_statuses", force: :cascade do |t|
    t.integer "match_status_id"
    t.string "description"
    t.string "sports", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "outcomes", force: :cascade do |t|
    t.integer "outcome_id"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "recovery_requests", force: :cascade do |t|
    t.string "product"
    t.string "timestamp"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "transactions", force: :cascade do |t|
    t.integer "user_id"
    t.string "category"
    t.integer "amount"
    t.string "reference"
    t.string "currency"
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "phone_number"
    t.decimal "balance_before", precision: 12, scale: 2
    t.decimal "balance_after", precision: 12, scale: 2
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: ""
    t.string "phone_number", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.integer "failed_attempts", default: 0, null: false
    t.string "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "first_name"
    t.string "last_name"
    t.decimal "balance", precision: 10, scale: 2, default: "0.0"
    t.integer "pin"
    t.datetime "pin_sent_at"
    t.boolean "verified", default: false
    t.integer "password_reset_code"
    t.datetime "password_reset_sent_at"
    t.boolean "account_active", default: true
    t.boolean "agreement"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["phone_number"], name: "index_users_on_phone_number", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["unlock_token"], name: "index_users_on_unlock_token", unique: true
  end

  create_table "void_reasons", force: :cascade do |t|
    t.integer "void_reason_id"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "withdraws", force: :cascade do |t|
    t.decimal "amount", precision: 12, scale: 2
    t.string "network"
    t.string "payment_method"
    t.decimal "balance_before", precision: 12, scale: 2
    t.decimal "balance_after", precision: 12, scale: 2
    t.string "ext_transaction_id"
    t.string "transaction_id"
    t.string "resource_id"
    t.string "receiving_fri"
    t.string "status"
    t.string "message"
    t.string "currency"
    t.string "phone_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "user_id", null: false
    t.string "transaction_reference"
    t.index ["ext_transaction_id"], name: "index_withdraws_on_ext_transaction_id", unique: true
    t.index ["phone_number"], name: "index_withdraws_on_phone_number"
    t.index ["resource_id"], name: "index_withdraws_on_resource_id", unique: true
    t.index ["status"], name: "index_withdraws_on_status"
    t.index ["transaction_id"], name: "index_withdraws_on_transaction_id", unique: true
    t.index ["user_id"], name: "index_withdraws_on_user_id"
  end

  add_foreign_key "bet_slips", "users"
  add_foreign_key "bets", "bet_slips"
  add_foreign_key "bets", "fixtures"
  add_foreign_key "bets", "markets"
  add_foreign_key "bets", "outcomes"
  add_foreign_key "bets", "users"
  add_foreign_key "deposits", "users"
  add_foreign_key "line_bets", "carts"
  add_foreign_key "line_bets", "fixtures"
  add_foreign_key "market10_lives", "fixtures"
  add_foreign_key "market10_pres", "fixtures"
  add_foreign_key "market16_lives", "fixtures"
  add_foreign_key "market16_pres", "fixtures"
  add_foreign_key "market18_lives", "fixtures"
  add_foreign_key "market18_pres", "fixtures"
  add_foreign_key "market1_lives", "fixtures"
  add_foreign_key "market1_pres", "fixtures"
  add_foreign_key "market29_lives", "fixtures"
  add_foreign_key "market29_pres", "fixtures"
  add_foreign_key "market60_lives", "fixtures"
  add_foreign_key "market60_pres", "fixtures"
  add_foreign_key "market63_lives", "fixtures"
  add_foreign_key "market63_pres", "fixtures"
  add_foreign_key "market66_lives", "fixtures"
  add_foreign_key "market66_pres", "fixtures"
  add_foreign_key "market68_lives", "fixtures"
  add_foreign_key "market68_pres", "fixtures"
  add_foreign_key "market75_lives", "fixtures"
  add_foreign_key "market75_pres", "fixtures"
  add_foreign_key "withdraws", "users"
end
