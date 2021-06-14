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
                const market = this.data.get("market"); 
                this.update_odds(data, market);
            }
        });
    }

    update_odds(data, market) {
        const outcomes = ["1", "2", "X", "12", "1X", "X2", "Yes", "No", "Under", "Over"];
        outcomes.forEach(element => {
            if ($(`#live_${market}_${element}_${data.fixture_id}`).length > 0) {
                $(`#live_${market}_${element}_${data.fixture_id}`).html(data[`outcome_${element}`]);
            }
        });
    }

    disconnect() {
        this.subscription.unsubscribe();
    }

}