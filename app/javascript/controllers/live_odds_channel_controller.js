import { Controller } from "stimulus"
import consumer from "../channels/consumer"
import $ from 'jquery';

export default class extends Controller {
    connect() {
        this.subscription = consumer.subscriptions.create({ channel: "LiveOddsChannel" }, { received: (data) => { this.update_odds(data), this.update_time(data) } });
    }

    update_odds(data) {
        let record = data["record"];

        const outcomes = ["1", "2", "3", "9", "10", "11", "12", "13", "74", "76", "1714", "1715"];
        outcomes.forEach(element => {
            if ($(`#live_${element}_${record.fixture_id}`).length > 0) {
                $(`#live_${element}_${record.fixture_id}`).html(record[`outcome_${element}`]);
            }
        });


    }

    update_time(data) {
        let record = JSON.parse(data["record"]);
        if ($(`#match_time_${record.fixture_id}`).length > 0) {
            $(`#match_time_${record.fixture_id}`).html(record.match_time)
        }
        if ($(`#match_score_${record.fixture_id}`).length > 0) {
            $(`#match_score_${record.fixture_id}`).html(`${record.home_score} - ${record.away_score}`);
        }

    }

    disconnect() {
        this.subscription.unsubscribe();
    }

}