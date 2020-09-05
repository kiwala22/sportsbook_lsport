import {Controller} from "stimulus"

export default class extends Controller {
	static targets = ["search", "fixtures"]


	connect(){
		
		document.getElementById("fixture-table-body").removeAttribute("data-controller");
		// document.getElementById("fixture-table-body").removeAttribute("data-target");
		document.getElementById("fixture-table-body").removeAttribute("data-refresh-interval");
		// document.getElementById("paginate").removeAttribute("data-target");
		document.getElementById("spinner").remove();
		
	}

	searchFixture(){
		
		const matchList = document.getElementById('fixture-table-body')
		const search = document.getElementById('search')
		const value =  this.searchTarget.value
		let token = document.getElementsByName('csrf-token')[0].content
		let next_page = null
		let url = next_page.href

			Rails.ajax({
            type: 'GET',
            headers: {
                'X-CSRF-Token': token
            },
            url:url,
            dataType: 'json',
            success: (data) => {}
        
		})					
	}
}