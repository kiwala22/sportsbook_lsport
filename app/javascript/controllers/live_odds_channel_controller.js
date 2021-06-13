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
                this.update_odds(data);
            }
        });
    }

    update_odds(data) {
        const outcomes = ["1", "X", "2", "Yes", "No", "Under", "Over", "1X", "12", "X2"];
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