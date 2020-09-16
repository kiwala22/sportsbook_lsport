import { Controller } from "stimulus"
import consumer from "../channels/consumer"
import $ from 'jquery';

export default class extends Controller {
    connect() {
        let self = this;
        this.subscription = consumer.subscriptions.create({
            channel: "RealtimePartialChannel",
            key: this.data.get("key"),

        }, {
            received({ market, fixture, status }) {
                if (market) {
                    self.onMarketChange(market)
                }
                if (fixture) {
                    self.onFixtureChange(fixture)
                }

                if (status) {
                    if (self.data.has("url") && self.data.has("method")) {
                        self.refresh_market(self.data.get("url"), self.data.get("method"))
                    }
                }

            }
        });
    }

    onFixtureChange({ fixture_id, home_score, away_score, match_time }) {
        $(`#match_time_${fixture_id}`).html(match_time)
        $(`#match_score_${fixture_id}`).html(`${home_score} - ${away_score}`);
    }

    onMarketChange(market) {
        window.dispatchEvent(new CustomEvent("odds_change", { detail: market }));
        if (market instanceof Object) {
            //Odds
            $(`#odd1_${market.fixture_id}`).html(market.outcome_1);
            $(`#odd2_${market.fixture_id}`).html(market.outcome_2);
            $(`#odd3_${market.fixture_id}`).html(market.outcome_3);
            //Outcomes
            $(`#outcome_1_${market.fixture_id}`).html(market.outcome_1);
            $(`#outcome_2_${market.fixture_id}`).html(market.outcome_2);
            $(`#outcome_3_${market.fixture_id}`).html(market.outcome_3);
            $(`#outcome_9_${market.fixture_id}`).html(market.outcome_9);
            $(`#outcome_10_${market.fixture_id}`).html(market.outcome_10);
            $(`#outcome_11_${market.fixture_id}`).html(market.outcome_11);
            $(`#outcome_13_${market.fixture_id}`).html(market.outcome_13);
            $(`#outcome_12_${market.fixture_id}`).html(market.outcome_12);
            $(`#outcome_74_${market.fixture_id}`).html(market.outcome_74);
            $(`#outcome_76_${market.fixture_id}`).html(market.outcome_76);
            $(`#outcome_1714_${market.fixture_id}`).html(market.outcome_1714);
            $(`#outcome_1715_${market.fixture_id}`).html(market.outcome_1715);
        }
    }

    refresh_market(url, method) {
        let token = document.getElementsByName('csrf-token')[0].content
        $("#fixture-table-body-1").empty()
        $("#fixture-table-body").empty()
        $("#fixture-table-body-1").append('<div class="d-flex justify-content-center"><div class="spinner-border" role="status"></div></div>')
        $("#fixture-table-body").append('<div class="d-flex justify-content-center"><div class="spinner-border" role="status"></div></div>')
        $("#bottom").hide();

        Rails.ajax({
            type: method,
            headers: {
                'X-CSRF-Token': token
            },
            url: url,
            dataType: 'script',
            success: (data) => {
                $("#bottom").show();
            }
        })
    }

}