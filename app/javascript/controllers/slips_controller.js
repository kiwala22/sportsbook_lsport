import { Controller } from "stimulus"

export default class extends Controller {
    static targets = ["odd", "wins", "total", "stake"]

    connect() {
        this.calculate_odds()
        this.display_win()
        window.addEventListener("odds_change", (event) =>  {
            let market = event.detail;

            this.oddTargets.forEach(element => {
                let { outcome, fixture_id } = $(element).data();
                if (market.hasOwnProperty("fixture_id") && market.fixture_id == fixture_id) {
                    let odd = market[outcome];
                    $(element).html(odd);
                    this.calculate_odds();
                    if (localStorage.getItem("stake")) {
                        this.onCalculateWin(localStorage.getItem("stake"));
                    }
                }
            });
        });

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
        if(!/[0-9]/.test(lastInput)) {
            if(amount.length == 0) {
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