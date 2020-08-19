import { Controller } from "stimulus"

export default class extends Controller {

    static targets = []



    connect() {
        this.load()
        if (this.data.has("interval")) {
            this.startRefreshing()
        }

    }

    disconnect() {
        this.stopRefreshing()
    }

    startRefreshing() {
        this.refreshTimer = setInterval(() => {
            this.load()
        }, this.data.get("interval"))
    }

    stopRefreshing() {
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer)
        }
    }

    load() {
        let url = this.data.get("url")
        let method = this.data.get("method")
        Rails.ajax({
            type: method,
            url: url,
            dataType: 'js'
        })
    }
}