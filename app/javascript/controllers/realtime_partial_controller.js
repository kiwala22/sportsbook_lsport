import { Controller } from "stimulus"
import consumer from "../channels/consumer"
import $ from 'jquery';

export default class extends Controller {
  connect() {
    this.subscription = consumer.subscriptions.create(   
      {
        channel: "RealtimePartialChannel",
        key: this.data.get("key")
      },
      {
        received(data) {
          let market = data['market'];
          if(data instanceof Object) {
            //Odds
            $(`#odd1_${market.fixture_id}`).html(market.outcome_1);
            $(`#odd2_${market.fixture_id}`).html(market.outcome_2);
            $(`#odd3_${market.fixture_id}`).html(market.outcome_3);
            //Outcomes
            $(`#outcome_1_${market.fixture_id}`).html(market.outcome_1);
            $(`#outcome_2_${market.fixture_id}`).html(market.outcome_2);
            $(`#outcome_3_${market.fixture_id}`).html(market.outcome_3);
            $(`#outcome_9_${market.fixture_id}`).html(market.outcome_9);
            $(`#outcome_10_${market.fixture_id}`).html(market.outcome_10);
            $(`#outcome_11_${market.fixture_id}`).html(market.outcome_11);
            $(`#outcome_13_${market.fixture_id}`).html(market.outcome_13);
            $(`#outcome_12_${market.fixture_id}`).html(market.outcome_12);
            $(`#outcome_74_${market.fixture_id}`).html(market.outcome_74);
            $(`#outcome_76_${market.fixture_id}`).html(market.outcome_76);
            $(`#outcome_1714_${market.fixture_id}`).html(market.outcome_1714);
            $(`#outcome_1715_${market.fixture_id}`).html(market.outcome_1715);
          }
        }
      }
    );
  }

  disconnect() {
    this.subscription.unsubscribe();
  }
}