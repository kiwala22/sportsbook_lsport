import { Controller } from "stimulus"
import consumer from "../channels/consumer"
import $ from 'jquery';

export default class extends Controller {
    connect() {
        this.subscription = consumer.subscriptions.create({
            channel: "MarketsChannel",
            fixture: this.data.get("fixture")
        }, { received: this.refresh_fixture(this.data.get("url"), this.data.get("method")) });
    }

    refresh_fixture(url, method) {

        let token = document.getElementsByName('csrf-token')[0].content;
        console.log(url, method);
        $("#fixture-table-body-1").empty();
        $("#fixture-table-body").empty();
        $("#fixture-table-body-1").append('<div class="d-flex justify-content-center"><div class="spinner-border" role="status"></div></div>');
        $("#fixture-table-body").append('<div class="d-flex justify-content-center"><div class="spinner-border" role="status"></div></div>');
        $("#bottom").hide();

        Rails.ajax({
            type: method,
            headers: {
                'X-CSRF-Token': token
            },
            url: url,
            dataType: 'script',
            success: (data) => {
                $("#bottom").show();
            }
        });

    }

    disconnect() {
        this.subscription.unsubscribe();
    }
}