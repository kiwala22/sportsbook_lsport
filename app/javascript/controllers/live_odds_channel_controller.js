import { Controller } from "stimulus"
import consumer from "../channels/consumer"
import $ from 'jquery';

export default class extends Controller {
    connect() {
        this.subscription = consumer.subscriptions.create({
            channel: "LiveOddsChannel",
            fixture: this.data.get("fixture"),
            market: this.data.get("market")
        }, {
            received: (data) => {
                let market = this.data.get("market");
                if (market == "1" && data['fixture_id'] == "4204"){
                    console.log("Outcome 1: " + data['outcome_1']);
                    console.log("Outcome 2: " + data['outcome_2']);
                    console.log("Outcome 3: " + data['outcome_3']);
                }
                this.update_odds(data);
            }
        });
    }

    update_odds(data) {
        const outcomes = ["1", "2", "3", "9", "10", "11", "12", "13", "74", "76", "1714", "1715"];
        outcomes.forEach(element => {
            if ($(`#live_${element}_${data.fixture_id}`).length > 0) {
                $(`#live_${element}_${data.fixture_id}`).html(data[`outcome_${element}`]);
            }
        });
    }

    disconnect() {
        this.subscription.unsubscribe();
    }

}