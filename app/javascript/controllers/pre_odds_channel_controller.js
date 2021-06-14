import { Controller } from "stimulus"
import consumer from "../channels/consumer"
import $ from 'jquery';


export default class extends Controller {
    connect() {
        this.subscription = consumer.subscriptions.create({
            channel: "PreOddsChannel",
            fixture: this.data.get("fixture"),
            market: this.data.get("market")
        }, {
            received: (data) => {
                const market = this.data.get("market");
                this.update_odds(data, market)
            }
        });
    }

    update_odds(data, market) {
        const outcomes = ["1", "2", "X", "12", "1X", "X2", "Yes", "No", "Under", "Over"];
        outcomes.forEach(element => {
            if ($(`#pre_${market}_${element}_${data.fixture_id}`).length > 0) {
                $(`#pre_${market}_${element}_${data.fixture_id}`).html(data[`outcome_${element}`]);
                $(`#pre_${market}_${element}_${data.fixture_id}`).addClass('fade-it');

                setTimeout(function(){ 
                    $(`#pre_${market}_${element}_${data.fixture_id}`).removeClass('fade-it');
                },1000);
            }
        });
    }

    disconnect() {
        this.subscription.unsubscribe();
    }
}