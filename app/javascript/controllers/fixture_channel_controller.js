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
        var match_time = `#match_time_${record.id}`;
        var match_score = `#match_score_${record.id}`;
        if ($(match_time).length > 0) {
            $(match_time).html(record['match_time']);
        }
        if ($(match_score).length > 0) {
            $(match_score).html(`${record.home_score} - ${record.away_score}`);
        }

    }

    disconnect() {
        this.subscription.unsubscribe();
    }
}