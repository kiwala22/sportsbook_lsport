import {Controller} from "stimulus"

export default class extends Controller {
	static targets = ["q", "fixtures"]


	connect(){
		// this.searchFixture();
		this.searchFixture();
	}

	searchFixture(){
		try{
		const matchList = document.getElementById('fixture-table-body')
		const search = document.getElementById('search')
		const value =  this.qTarget.value
		fetch(`/?q=${value}`, {
			headers: {
				accept: 'application/json'
			}
		}).then((response) => response.json())
		.then( data => {
			var fixtureArray = Object.values(data)[0]

			if(search.value.length>0){

			//***check for elements in fixture array
				if(fixtureArray !==[]){
					matchList.innerHTML = fixtureArray

				//***removing the refresh controller
					document.getElementById("fixture-table-body").removeAttribute("data-controller");
					document.getElementById("fixture-table-body").removeAttribute("data-refresh-interval");


				//***removing pagination & bottom spinner
					var bottom = document.getElementById("bottom");
					bottom.remove()
				
					throw new Error('removed temporarilly')
				}else{
					matchList.innerHTML = "No Fixtures"
				}

			}else{
				matchList.innerHTML = []
			}

		})
	}catch(e){
			console.error("Occured:"+e.message);
			return []
		}
					
	}


}