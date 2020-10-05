import { Controller } from "stimulus"
import consumer from "../channels/consumer"
import $ from 'jquery'


export default class extends Controller {
    connect() {
        this.subscription = consumer.subscriptions.create({
            channel: "MarketsChannel",
            fixture: this.data.get("fixture")
                //market: this.data.get("market")
        }, {
            received: (data) => {
                this.refresh_fixture(this.data.get("url"), this.data.get("method"));
            }
        });
    }

    refresh_fixture(url, method) {
        let token = document.getElementsByName('csrf-token')[0].content;
        setTimeout(() =>
            Rails.ajax({
                type: method,
                headers: {
                    'X-CSRF-Token': token
                },
                url: url,
                dataType: 'script',
                success: () => {

                }
            }), 50);
        setTimeout(() =>
            Rails.ajax({
                type: 'POST',
                headers: {
                    'X-CSRF-Token': token
                },
                url: '/refresh_slip',
                dataType: 'script',
                success: () => {

                }
            }), 50);
    }

    disconnect() {
        this.subscription.unsubscribe();
    }
}