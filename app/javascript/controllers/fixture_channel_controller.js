import { Controller } from "stimulus"
import consumer from "../channels/consumer"
import $ from 'jquery';

export default class extends Controller {
    connect() {
        this.subscription = consumer.subscriptions.create({
            channel: "FixtureChannel"
        }, { received: (data) => { this.update_fixture(data) } });
    }

    update_fixture(data) {
        let record = data["record"];
        var match_time = `#match_time_${record.fixture_id}`;
        var match_score = `#match_time_${record.fixture_id}`;
        console.log(record, match_time, match_score);
        if ($(match_time).length > 0) {
            console.log(match_time, record.match_time);
            $(match_time).html(record['match_time']);
        }
        if ($(match_score).length > 0) {
            console.log(match_score, record.home_score, record.away_score);
            $(match_score).html(`${record.home_score} - ${record.away_score}`);
        }

    }

    disconnect() {
        this.subscription.unsubscribe();
    }
}