// import $ from "jquery";
// import { Controller } from "stimulus";
// import consumer from "../channels/consumer";

// export default class extends Controller {
//   connect() {
//     this.subscription = consumer.subscriptions.create(
//       {
//         channel: "FixtureChannel",
//         fixture: this.data.get("fixture"),
//       },
//       {
//         received: (data) => {
//           console.log("Hello I am also streaming");
//           this.update_fixture(data);
//         },
//       }
//     );
//   }

//   update_fixture(data) {
//     var match_time = `#match_time_${data.id}`;
//     var match_score = `#match_score_${data.id}`;
//     //update the time and score
//     $(match_time).html(data.match_time);
//     $(match_score).html(`${data.home_score} - ${data.away_score}`);
//   }

//   disconnect() {
//     this.subscription.unsubscribe();
//   }
// }
