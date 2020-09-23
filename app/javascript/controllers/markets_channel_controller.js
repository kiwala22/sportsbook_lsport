import { Controller } from "stimulus"
import consumer from "../channels/consumer"
import $ from 'jquery';

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
        Rails.ajax({
            type: method,
            headers: {
                'X-CSRF-Token': token
            },
            url: url,
            dataType: 'script',
            success: () => {
                //window.location.reload();
            }
        });

    }

    disconnect() {
        this.subscription.unsubscribe();
    }
}