import { Controller } from "stimulus"
import consumer from "../channels/consumer"
import $ from 'jquery';

export default class extends Controller {
    connect() {
        this.subscription = consumer.subscriptions.create({ channel: "FixtureChannel" }, { received: (data) => { this.update_fixture(data) } });
    }

    update_fixture(data) {
        let record = data["record"];
        if ($(`#match_time_${record.fixture_id}`).length > 0) {
            $(`#match_time_${record.fixture_id}`).html(record['match_time'])
        }
        if ($(`#match_score_${record.fixture_id}`).length > 0) {
            $(`#match_score_${record.fixture_id}`).html(`${record['home_score']} - ${record['away_score']}`);
        }

    }

    disconnect() {
        this.subscription.unsubscribe();
    }
}