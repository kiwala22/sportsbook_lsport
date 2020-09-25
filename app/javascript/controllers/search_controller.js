import { Controller } from "stimulus"
import $ from 'jquery'
export default class extends Controller {

    searchFixture() {
        if (event.key === "Enter") {
            $("#featured").hide();
            $("#bottom").hide();
            $("#fixture-table-body").removeAttr("data-controller");
            $("#fixture-table-body-1").removeAttr("data-controller");
        }
    }
}