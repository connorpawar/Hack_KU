const app = {};

app.apiUrl = 'https://api.spotify.com/v1';

app.accessToken = "";

//Get names of artists
app.events = function(){
	$('form').on('submit', function(ev){
		ev.preventDefault();
		let artists = $('input[type=search]').val();
		artists = artists.split(',');
		let search = artists.map(artistName => app.searchArtist(artistName));

		//console.log(search[0]);
		var json = JSON.parse(search[0]);
		console.log(alert(json.artists.items));
		//console.log(search);
		/*$.when(...search)
				.then((...results) => {
					results = results.map((res) => res[0].artists.items[0]);
					console.log(results);
		});*/
	});
};

//Search for the artists
app.searchArtist = (artistName) => $.ajax({
	url: 'https://api.spotify.com/v1/search',
	headers:{
		//'Access-Control-Allow-Origin': '*',
		'Authorization': 'Bearer ' + app.accessToken
	},
	method: 'GET',
	dataType: 'json',
	data: {
		q: artistName,
		type: 'artist'
	}
})

app.auth = function(){
	$.ajax({
		url: 'https://accounts.spotify.com/authorize?client_id=cf140ae1b5c249a1b406fc640522ca3c&redirect_uri=http://127.0.0.1:8887/&response_type=token',
		headers:{
			'Access-Control-Allow-Origin': '*'
		}
	})
    url = window.location.href;
		accessToken = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
		return(accessToken);
};

app.init = function(){
	app.accessToken = app.auth();
	console.log(app.accessToken);
	app.events(app.accessToken);

};

$(app.init);
