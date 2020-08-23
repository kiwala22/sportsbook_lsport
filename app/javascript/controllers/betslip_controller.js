import { Controller } from "stimulus"

export default class extends Controller {
    connect() {
        this.load()

        if (this.data.has("refreshInterval")) {
            this.startRefreshing()
        }
    }

    disconnect() {
        this.stopRefreshing()
    }

    startRefreshing() {
        this.refreshTimer = setInterval(() => {
            this.load()
        }, this.data.get("refreshInterval"))
    }

    stopRefreshing() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer)
        }
    }

    load() {
        let url = "/refresh_slip"
        Rails.ajax({
            type: 'POST',
            url: url,
            dataType: 'js',
            success: (data) => {
                console.log("Success")
            }
        })
    }


}