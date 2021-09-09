// import { Controller } from "stimulus"

// export default class extends Controller {
//     static targets = ["betslip"]

//     connect() {
//         this.hideCloseButton()
//         if (this.data.has("interval")) {
//             this.startRefreshing();
//         }

//     }

//     disconnect() {
//         this.stopRefreshing();
//     }

//     startRefreshing() {
//         this.refreshTimer = setInterval(() => {
//             this.hideCloseButton();
//         }, this.data.get("interval"))
//     }

//     stopRefreshing() {
//         if (this.refreshTimer) {
//             clearInterval(this.refreshTimer);
//         }
//     }

//     closeSlip() {
//         this.betslipTarget.classList.remove("active");
//         // console.log(this.betslipTarget.classList)
//     }

//     showSlip() {
//         this.betslipTarget.classList.toggle("active");
//         //console.log(this.betslipTarget.classList)
//     }

//     popSlip() {
//         $("#myModal").modal('show');
//         // $('h5.modal-title').text("BetSlip");
//     }

//     removeBet(e) {
//         $(e.target.closest('.lineBet')).remove()
//         var games = this.checkNumberOfGames();
//         $('#slip-ticket-count').html(`${games}`);
//         this.clearBetSlip();
//     }

//     clearBetSlip() {
//         if ($('.lineBet').length == 0){
//             $('#myModalBody').html('<p class="d-flex justify-content-center">BetSlip Cleared</p>');
//             setTimeout(() => {
//                 $('#myModalBody').empty();
//             }, 2000);
//         }else {
//             let odds = [];
//             let myDiv = $('.lineBet');
//             for (let index = 0; index < myDiv.length; index++) {
//                 const lineBet = $(myDiv[index]);
//                 let singleBet = lineBet.find('.single-bet')
//                 let odd = parseFloat(singleBet.children().last().html())
//                 odds.push(odd);
//             }
//             this.calculateOdds(odds);
//         }
//     }

//     calculateOdds(arr) {
//         let newOdds = (arr.reduce((a, b) => a * b, 1)).toFixed(2);
//         $('#total-odds').html(`${newOdds}`);

//         if ($('#stake-input').val() !== null && ($('#stake-input').val() >= 1000 || $('#stake-input').val() <= 1000000)) {
//             let newAmount = ($('#stake-input').val() * newOdds).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//             $('#total-wins').html(`UGX ${newAmount}`);
//         }else {
//             $('#total-wins').html('');
//         }
//     }

//     checkNumberOfGames() {
//         var games = $('.lineBet').length;
//         // return new Promise((resolve, reject) => {
//         //     Rails.ajax({
//         //         type: 'get',
//         //         url: '/button_display',
//         //         dataType: 'json',
//         //         success: (data) => {
//         //             resolve(data.games);
//         //         }
//         //     });
//         // });
//         return games;
//     }

//     hideCloseButton() {
//         var num = this.checkNumberOfGames();
//         if (num == 0) {
//             $("#close-button").hide()
//             $("#betslip").hide()
//         }else if (num > 0) {
//             $("#close-button").show()
//             $("#betslip").show()
//         }
//     }

// }
