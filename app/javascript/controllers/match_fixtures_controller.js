// Visit The Stimulus Handbook for more details 
// https://stimulusjs.org/handbook/introduction
// 
// This example controller works with specially annotated HTML like:
//
// <div data-controller="hello">
//   <h1 data-target="hello.output"></h1>
// </div>

import { Controller } from "stimulus"

export default class extends Controller {
    static targets = ["fixtures", "pagination"]

    initialize() {
        let options = {
            rootMargin: '200px',
        }

        this.intersectionObserver = new IntersectionObserver(entries => this.processIntersectionEntries(entries), options)
    }

    connect() {
        this.intersectionObserver.observe(this.paginationTarget)
    }

    disconnect() {
        this.intersectionObserver.unobserve(this.paginationTarget)
    }

    processIntersectionEntries(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadMore()
            }
        })
    }

    loadMore() {
        let next_page = this.paginationTarget.querySelector("a[rel='next']")
        if (next_page == null) { return }
        let url = next_page.href
        this.paginationTarget.classList.add("spinner-border")
        Rails.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: (data) => {
                this.fixturesTarget.insertAdjacentHTML('beforeend', data.fixtures)
                this.paginationTarget.innerHTML = data.pagination
                this.paginationTarget.classList.remove("spinner-border")
            }
        })
    }
}