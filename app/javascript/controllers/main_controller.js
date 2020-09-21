import { Controller } from "stimulus"

export default class extends Controller {
    static targets = ["betslip"]

    closeSlip() {
        this.betslipTarget.classList.remove("active");
        // console.log(this.betslipTarget.classList)
    }

    showSlip() {
        this.betslipTarget.classList.toggle("active");
        //console.log(this.betslipTarget.classList)
    }

}