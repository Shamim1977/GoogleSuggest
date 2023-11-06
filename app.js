var axios = require('axios');
var fs = require('fs');

let link = 'https://www.google.com/complete/search?&hl=LANG&gl=LOC&q=QUERY&client=chrome';


function GetGoogleSuggests(lang, loc, query){
	if (!query) {
		console.log('Query string is empty!');
		return;
	}

	link = link.replace(/LANG/g, lang).replace(/LOC/g, loc).replace(/QUERY/g, encodeURIComponent(query));

	axios.get(link)
	.then(response => {
		let formattedJson = JSON.stringify(response.data, null, 2);
		fs.writeFileSync('output.json', formattedJson);

		let items = response.data[1];
		for (let i=0; i<items.length; i++){
			console.log((i+1), ":", items[i]);
		}
	})
	.catch(error => {
		console.log(error);
	});
}

GetGoogleSuggests('en', 'us', 'youtube');


/*

China		CN		Chinese			ZH	
France		FR		French			FR
India		IN		Hindi			HI
Mexico		MX		Spanish			ES

*/