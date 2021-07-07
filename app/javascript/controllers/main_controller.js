import { Controller } from "stimulus"

export default class extends Controller {
    static targets = ["betslip"]

    connect() {
        this.checkNumberOfGames()
        if (this.data.has("interval")) {
            this.startRefreshing();
        }

    }

    disconnect() {
        this.stopRefreshing();
    }

    startRefreshing() {
        this.refreshTimer = setInterval(() => {
            this.checkNumberOfGames();
        }, this.data.get("interval"))
    }

    stopRefreshing() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
        }
    }

    closeSlip() {
        this.betslipTarget.classList.remove("active");
        // console.log(this.betslipTarget.classList)
    }

    showSlip() {
        this.betslipTarget.classList.toggle("active");
        //console.log(this.betslipTarget.classList)
    }

    popSlip() {
        $("#myModal").modal('show');
        // $('h5.modal-title').text("BetSlip");
    }

    removeBet(e) {
        $(e.target.closest('.lineBet')).hide()
    }

    checkNumberOfGames() {
        Rails.ajax({
            type: 'get',
            url: '/button_display',
            dataType: 'json',
            success: (data) => {
                var total = data.games
                if (total == 0) {
                    $("#close-button").hide()
                }else if (total > 0) {
                    $("#close-button").show()
                }
            }});
    }

}