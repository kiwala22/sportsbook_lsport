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
        const outcomes = ["1", "2", "3", "9", "10", "11", "12", "13", "74", "76", "1714", "1715"];
        outcomes.forEach(element => {
          if($(`#outcome_${element}_${market.fixture_id}`).length > 0){
            $(`#outcome_${element}_${market.fixture_id}`).html(market[`outcome_${element}`]);
          }
        });
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