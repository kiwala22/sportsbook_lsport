import {Controller} from "stimulus"

export default class extends Controller {
	static targets = ["q", "fixtures"]


	connect(){
		this.submit();
	}

	submit(event){
		const value =  this.qTarget.value
		fetch(`/?q=${value}`, {
			headers: {accept: 'application/json'}
		}).then((response) => response.json())
		.then( data => {
			var fixtureHTML = ""
			var fixtureArray = Object.values(data)[0]

		//console.log(fixtureArray)

		});

	}

}
