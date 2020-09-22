import { Controller } from "stimulus"
import consumer from "../channels/consumer"
import $ from 'jquery';

export default class extends Controller {
    connect() {
        this.subscription = consumer.subscriptions.create({
            channel: "MarketsChannel",
            fixture: this.data.get("fixture")
        }, { received: this.refresh_fixture() });
    }

    refresh_fixture() {
        location.reload()

    }

    disconnect() {
        this.subscription.unsubscribe();
    }
}