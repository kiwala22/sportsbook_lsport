import { Controller } from "stimulus"

export default class extends Controller {
    static targets = ["odd", "wins", "total", "stake"]

    connect() {
        this.calculate_odds()
        if (localStorage.getItem("stake") !== null) {
            this.display_win()
        } else {
            $("#stake-input").val("")
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

        this.totalTarget.innerHTML = total
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
        const amount = event.target.value
        localStorage.setItem("stake", amount)
        const totalOdd = parseFloat(this.totalTarget.innerHTML)
        this.winsTarget.innerHTML = 'UGX ' + (totalOdd * amount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    display_win() {
        if (localStorage.getItem("stake") !== 'null') {
            let stakeAmount = parseFloat(localStorage.getItem("stake"))

            if (stakeAmount !== "null") {
                $("#stake-input").val(stakeAmount)
                const totalOdd = parseFloat(this.totalTarget.innerHTML)
                this.winsTarget.innerHTML = 'UGX ' + (totalOdd * stakeAmount).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }

        }

    }

}