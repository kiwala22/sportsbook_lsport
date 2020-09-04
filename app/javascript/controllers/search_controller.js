import {Controller} from "stimulus"

export default class extends Controller {
	static targets = ["q", "fixtures"]


	connect(){
		this.submit();
	}

	submit(event){
		const matchList = document.getElementById('match-list')
		const search = document.getElementById('search')
		const value =  this.qTarget.value
		fetch(`/?q=${value}`, {
			headers: {
				accept: 'application/json'
			}
		}).then((response) => response.json())
		.then( data => {
			var fixtureHTML;
			var fixtureArray = Object.values(data)[0]

		// console.log(fixtureArray)

		if(search.value.length>0){
			matchList.innerHTML = fixtureArray
		}else{
			matchList.innerHTML = []
		}

		});
					
	}

	display(characters){
		const htmlString = characters
		.map((characters)=>{
			return `
            <li>
               <a href=${fixtures_soccer_pre_path(id=fixture.id) }>
                  ${ fixture.scheduled_time.strftime("%H:%M:%S ") } <br>
                  ${ fixture.scheduled_time.strftime("%d/%m/%y") }
               </a>
            </li>
            <li><a href=${fixtures_soccer_pre_path(id= fixture.id) }>
            <strong>${ fixture.comp_one_name }</strong> - 
            <strong>${ fixture.comp_two_name }</strong> </a> </li>
            <li>
               <a href=${fixtures_soccer_pre_path(id= fixture.id) }>
                  ${ fixture.tournament_name } <br>
                  ${ fixture.category }
               </a>
            </li>
            `;
		})
		.join('');
		charactersList.innerHTML = htmlString;
	}

}