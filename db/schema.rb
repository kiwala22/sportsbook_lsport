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

ActiveRecord::Schema.define(version: 2020_05_11_050727) do

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

  create_table "bet_slips", force: :cascade do |t|
    t.integer "bet_count"
    t.decimal "stake", precision: 12, scale: 2
    t.decimal "win_amount", precision: 12, scale: 2
    t.decimal "odds", precision: 10, scale: 2
    t.decimal "potential_win_amount", precision: 12, scale: 2
    t.string "status"
    t.boolean "paid"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "bets", force: :cascade do |t|
    t.string "event"
    t.string "sport"
    t.string "type"
    t.decimal "odds", precision: 5, scale: 2
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
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
    t.index ["ext_transaction_id"], name: "index_deposits_on_ext_transaction_id", unique: true
    t.index ["phone_number"], name: "index_deposits_on_phone_number"
    t.index ["resource_id"], name: "index_deposits_on_resource_id", unique: true
    t.index ["transaction_id"], name: "index_deposits_on_transaction_id", unique: true
    t.index ["user_id"], name: "index_deposits_on_user_id"
  end

  create_table "market10_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "competitor1_draw", precision: 6, scale: 2
    t.decimal "competitior1_competitior2", precision: 6, scale: 2
    t.decimal "draw_competitor2", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market10_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "competitor1_draw", precision: 6, scale: 2
    t.decimal "competitior1_competitior2", precision: 6, scale: 2
    t.decimal "draw_competitor2", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market16_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "competitor1", precision: 6, scale: 2
    t.decimal "competitior2", precision: 6, scale: 2
    t.integer "threshold"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market16_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "competitor1", precision: 6, scale: 2
    t.decimal "competitior2", precision: 6, scale: 2
    t.integer "threshold"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market18_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "under", precision: 6, scale: 2
    t.decimal "over", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market18_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "under", precision: 6, scale: 2
    t.decimal "over", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market1_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "competitor1", precision: 6, scale: 2
    t.decimal "draw", precision: 6, scale: 2
    t.decimal "competitor2", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market1_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "competitor1", precision: 6, scale: 2
    t.decimal "draw", precision: 6, scale: 2
    t.decimal "competitor2", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market29_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "yes", precision: 6, scale: 2
    t.decimal "no", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market29_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "yes", precision: 6, scale: 2
    t.decimal "no", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market63_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "competitor1_draw", precision: 6, scale: 2
    t.decimal "competitior1_competitior2", precision: 6, scale: 2
    t.decimal "draw_competitor2", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market63_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "competitor1_draw", precision: 6, scale: 2
    t.decimal "competitior1_competitior2", precision: 6, scale: 2
    t.decimal "draw_competitor2", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market66_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "competitor1", precision: 6, scale: 2
    t.decimal "competitior2", precision: 6, scale: 2
    t.integer "threshold"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market66_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "competitor1", precision: 6, scale: 2
    t.decimal "competitior2", precision: 6, scale: 2
    t.integer "threshold"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market68_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "under", precision: 6, scale: 2
    t.decimal "over", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market68_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "under", precision: 6, scale: 2
    t.decimal "over", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market75_lives", force: :cascade do |t|
    t.string "event_id"
    t.decimal "yes", precision: 6, scale: 2
    t.decimal "no", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market75_pres", force: :cascade do |t|
    t.string "event_id"
    t.decimal "yes", precision: 6, scale: 2
    t.decimal "no", precision: 6, scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "market_alerts", force: :cascade do |t|
    t.bigint "timestamp"
    t.integer "product"
    t.integer "subscribed"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "status", default: false
  end

  create_table "match_statuses", force: :cascade do |t|
    t.integer "match_status_id"
    t.string "description"
    t.string "sports", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "soccer_fixtures", force: :cascade do |t|
    t.string "event_id"
    t.datetime "scheduled_time"
    t.string "live_odds"
    t.string "status"
    t.string "tournament_round"
    t.string "betradar_id"
    t.integer "season_id"
    t.string "season_name"
    t.integer "tournament_id"
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
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "booked", default: false
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
    t.index ["ext_transaction_id"], name: "index_withdraws_on_ext_transaction_id", unique: true
    t.index ["phone_number"], name: "index_withdraws_on_phone_number"
    t.index ["resource_id"], name: "index_withdraws_on_resource_id", unique: true
    t.index ["status"], name: "index_withdraws_on_status"
    t.index ["transaction_id"], name: "index_withdraws_on_transaction_id", unique: true
    t.index ["user_id"], name: "index_withdraws_on_user_id"
  end

  add_foreign_key "deposits", "users"
  add_foreign_key "withdraws", "users"
end
