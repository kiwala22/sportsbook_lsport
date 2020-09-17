import { Controller } from "stimulus"
import consumer from "../channels/consumer"
import $ from 'jquery';

export default class extends Controller {
    connect() {
        this.subscription = consumer.subscriptions.create({ channel: "PreOddsChannel" }, { received: (data) => this.update_odds(data) });
    }

    update_odds(data) {
        let record = data["record"];

        const outcomes = ["1", "2", "3", "9", "10", "11", "12", "13", "74", "76", "1714", "1715"];
        outcomes.forEach(element => {
            if ($(`#pre_${element}_${record.fixture_id}`).length > 0) {
                $(`#pre_${element}_${record.fixture_id}`).html(record[`outcome_${element}`]);
            }
        });


    }

    disconnect() {
        this.subscription.unsubscribe();
    }
}