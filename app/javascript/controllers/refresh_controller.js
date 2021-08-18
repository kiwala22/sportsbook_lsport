import $ from "jquery";
import { Controller } from "stimulus";

export default class extends Controller {
  connect() {
    // this.load()
    // if (this.data.has("interval")) {
    //     this.startRefreshing()
    // }
  }

  disconnect() {
    this.stopRefreshing();
  }

  startRefreshing() {
    this.refreshTimer = setInterval(() => {
      this.load();
    }, this.data.get("interval"));
  }

  stopRefreshing() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  }

  load() {
    let url = this.data.get("url");
    let method = this.data.get("method");
    let token = document.getElementsByName("csrf-token")[0].content;
    $("#fixture-table-body-live").empty();
    $("#fixture-table-body-1").empty();
    $("#fixture-table-body").empty();
    $("#fixture-table-body-live").append(
      '<div class="d-flex justify-content-center"><div class="spinner-border" role="status"></div></div>'
    );
    $("#fixture-table-body-1").append(
      '<div class="d-flex justify-content-center"><div class="spinner-border" role="status"></div></div>'
    );
    $("#fixture-table-body").append(
      '<div class="d-flex justify-content-center"><div class="spinner-border" role="status"></div></div>'
    );
    $("#bottom").hide();

    Rails.ajax({
      type: method,
      headers: {
        "X-CSRF-Token": token,
      },
      url: url,
      dataType: "script",
      success: (data) => {
        $("#bottom").show();
      },
    });
  }
}
