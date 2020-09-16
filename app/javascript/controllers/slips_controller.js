import { Controller } from "stimulus"
import consumer from "../channels/consumer"

export default class extends Controller {
    static targets = ["odd", "wins", "total", "stake"]

    connect() {
        let self = this;
        this.calculate_odds();
        this.display_win();
        this.subscription = consumer.subscriptions.create({
            channel: "RealtimePartialChannel",
            key: this.data.get("key"),

        }, {
            received({ market }) {
                if (market) {
                    self.onSlipChange(market)
                }
            }
        });


    }

    onSlipChange(market) {
        const outcomes = ["1", "2", "3", "9", "10", "11", "12", "13", "74", "76", "1714", "1715"];
        outcomes.forEach(element => {
            if($(`#slip_odd${element}_${market.fixture_id}`).length > 0){
              $(`#slip_odd${element}_${market.fixture_id}`).html(market[`outcome_${element}`]);
            }
        });
        this.calculate_odds();
        if (localStorage.getItem("stake")) {
            this.onCalculateWin(localStorage.getItem("stake"));
        }
      
    }

    calculate_odds() {
        var oddsArr = new Array();
        if (this.hasOddTarget) {
            this.oddTargets.forEach(element => {
                oddsArr.push(element.innerHTML)
            });
        }
        oddsArr = oddsArr.map(Number);
        var total = this.multiply_odds(oddsArr)
        if (this.hasTotalTarget) {
            this.totalTarget.innerHTML = total
        }
        if (this.data.has("mobile")) {
            let count = document.getElementById('slip-ticket-count')
            count.innerHTML = oddsArr.length
        }

    }

    multiply_odds(arr) {
        var product = 1
        for (var i = 0; i < arr.length; i++) {
            product = product * arr[i]
        }
        return product.toFixed(2)
    }

    calculate_win() {
        const amount = event.target.value;
        let lastInput = amount.charAt(amount.length - 1);
        if (!/[0-9]/.test(lastInput)) {
            if (amount.length == 0) {
                localStorage.removeItem("stake");
                this.winsTarget.innerHTML = " ";
            }
            return $(event.target).val(amount.substring(0, amount.length - 1));
        }

        this.onCalculateWin(amount);
    }

    onCalculateWin(stake) {
        const amount = stake;
        localStorage.setItem("stake", amount)
        const totalOdd = parseFloat(this.totalTarget.innerHTML)
        this.winsTarget.innerHTML = 'UGX ' + (totalOdd * amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    display_win() {
        if (localStorage.getItem("stake") !== null && this.hasOddTarget) {
            let stakeAmount = parseFloat(localStorage.getItem("stake"))

            if (stakeAmount !== null) {
                $("#stake-input").val(stakeAmount)
                const totalOdd = parseFloat(this.totalTarget.innerHTML)
                this.winsTarget.innerHTML = 'UGX ' + (totalOdd * stakeAmount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }

        }
    }

}