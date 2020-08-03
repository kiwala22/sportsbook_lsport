import { Controller } from "stimulus"

export default class extends Controller {
    static targets = ["date"]

    activate() {
        this.dateTargets.forEach(target => {
            //remove avctive class
            target.classList.remove("active");
        });
        event.currentTarget.classList.add("active");
    }

}