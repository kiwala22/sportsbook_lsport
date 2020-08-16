import { Controller } from "stimulus"

export default class extends Controller {

    static targets = []



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
        let url = this.data.get("url")
        Rails.ajax({
            type: 'GET',
            url: url,
            dataType: 'js',
            success: (data) => {
                console.log("Success")
            }
        })
    }
}