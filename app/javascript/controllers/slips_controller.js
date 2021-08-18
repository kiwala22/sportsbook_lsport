// import { Controller } from "stimulus";
// import consumer from "../channels/consumer";

// export default class extends Controller {
//   static targets = ["odd", "wins", "total", "stake"];

//   connect() {
//     let self = this;
//     // this.calculate_odds();
//     // this.display_win();

//     this.subscription = consumer.subscriptions.create(
//       {
//         channel: "BetslipChannel",
//         fixture: this.data.get("fixture"),
//         market: this.data.get("market"),
//       },
//       {
//         received: (data) => {
//           const market = this.data.get("market");
//           self.update_betslip(data, market);
//         },
//       }
//     );
//   }

//   disconnect() {
//     this.subscription.unsubscribe();
//   }

//   update_betslip(data, market) {
//     const outcomes = [
//       "1",
//       "2",
//       "X",
//       "12",
//       "1X",
//       "X2",
//       "Yes",
//       "No",
//       "Under",
//       "Over",
//     ];
//     outcomes.forEach((element) => {
//       if ($(`#slip_${market}_${element}_${data.fixture_id}`).length > 0) {
//         $(`#slip_${market}_${element}_${data.fixture_id}`).html(
//           data[`outcome_${element}`]
//         );
//         $(`#slip_${market}_${element}_${data.fixture_id}`).css(
//           "color",
//           "#F6AE2D"
//         );
//         setTimeout(() => {
//           $(`#slip_${market}_${element}_${data.fixture_id}`).css(
//             "color",
//             "#ffffff"
//           );
//         }, 3000);

//         // this.update_odds();
//       }
//     });

//     // this.calculate_odds();
//     // if (localStorage.getItem("stake") && this.hasTotalTarget) {
//     //   this.onCalculateWin(localStorage.getItem("stake"));
//     // }
//   }

//   // update_odds() {
//   //   if ($(".lineBet").length != 0) {
//   //     let odds = [];
//   //     let myDiv = $(".lineBet");
//   //     for (let index = 0; index < myDiv.length; index++) {
//   //       const lineBet = $(myDiv[index]);
//   //       let singleBet = lineBet.find(".single-bet");
//   //       let odd = parseFloat(singleBet.children().last().html());
//   //       odds.push(odd);
//   //     }
//   //     this.calculate_odd_update(odds);
//   //   }
//   // }

//   // calculate_odd_update(arr) {
//   //   let newOdds = arr.reduce((a, b) => a * b, 1).toFixed(2);
//   //   $("#total-odds").html(`${newOdds}`);

//   //   if (
//   //     $("#stake-input").val() !== null &&
//   //     ($("#stake-input").val() >= 1000 || $("#stake-input").val() <= 1000000)
//   //   ) {
//   //     let newAmount = ($("#stake-input").val() * newOdds)
//   //       .toFixed(2)
//   //       .toString()
//   //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   //     $("#total-wins").html(`UGX ${newAmount}`);
//   //   } else {
//   //     $("#total-wins").html("");
//   //   }
//   // }

//   // calculate_odds() {
//   //   var oddsArr = new Array();
//   //   if (this.hasOddTarget) {
//   //     this.oddTargets.forEach((element) => {
//   //       oddsArr.push(element.innerHTML);
//   //     });
//   //   }
//   //   oddsArr = oddsArr.map(Number);
//   //   var total = this.multiply_odds(oddsArr);
//   //   if (this.hasTotalTarget) {
//   //     this.totalTarget.innerHTML = total;
//   //   }
//   //   if (this.data.has("mobile")) {
//   //     let count = document.getElementById("slip-ticket-count");
//   //     count.innerHTML = oddsArr.length;
//   //   }
//   // }

//   // multiply_odds(arr) {
//   //   var product = 1;
//   //   for (var i = 0; i < arr.length; i++) {
//   //     product = product * arr[i];
//   //   }
//   //   return product.toFixed(2);
//   // }

//   // calculate_win() {
//   //   const amount = event.target.value;
//   //   let lastInput = amount.charAt(amount.length - 1);
//   //   if (!/[0-9]/.test(lastInput)) {
//   //     if (amount.length == 0) {
//   //       $("#amount-limits").empty();
//   //       $("#place_bet").prop("disabled", false);
//   //       localStorage.removeItem("stake");
//   //       this.winsTarget.innerHTML = " ";
//   //     }
//   //     return $(event.target).val(amount.substring(0, amount.length - 1));
//   //   }

//   //   if (amount > 1000000 || amount < 1000) {
//   //     // $("#amount-limits").html("Stake should be between 1,000 and 1,000,000");
//   //     $("#place_bet").prop("disabled", true);
//   //     localStorage.removeItem("stake");
//   //     this.winsTarget.innerHTML = " ";
//   //   } else if (amount >= 1000 && amount <= 1000000) {
//   //     // $("#amount-limits").empty();
//   //     $("#place_bet").prop("disabled", false);
//   //     this.onCalculateWin(amount);
//   //   }
//   // }

//   // onCalculateWin(stake) {
//   //   const amount = stake;
//   //   localStorage.setItem("stake", amount);
//   //   const totalOdd = parseFloat(this.totalTarget.innerHTML);
//   //   this.winsTarget.innerHTML =
//   //     "UGX " +
//   //     (totalOdd * amount)
//   //       .toFixed(2)
//   //       .toString()
//   //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   // }

//   // display_win() {
//   //   if (localStorage.getItem("stake") !== null && this.hasOddTarget) {
//   //     let stakeAmount = parseFloat(localStorage.getItem("stake"));

//   //     if (stakeAmount !== null) {
//   //       $("#stake-input").val(stakeAmount);
//   //       const totalOdd = parseFloat(this.totalTarget.innerHTML);
//   //       this.winsTarget.innerHTML =
//   //         "UGX " +
//   //         (totalOdd * stakeAmount)
//   //           .toFixed(2)
//   //           .toString()
//   //           .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   //     }
//   //   }
//   // }
// }
