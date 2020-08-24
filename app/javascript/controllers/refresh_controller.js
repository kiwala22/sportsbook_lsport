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
        let token = document.getElementsByName('csrf-token')[0].content
        Rails.ajax({
            type: method,
            headers: {
                'X-CSRF-Token': token
            },
            url: url,
            dataType: 'script',
            success: (data) => {
                console.log("Success - " + url)
            }
        })
    }
}