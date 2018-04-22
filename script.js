const app = {};
let ar = null;
let al = null;
let albumCount = 3;
let songs = [];
let albums = [];

app.userID = localStorage.getItem("userIDSave");
app.catch1 = localStorage.getItem("catchSave");

app.playlistID = localStorage.getItem("playlistIDSave");
app.accessToken = localStorage.getItem("accessTokenSave");

//app.urlCheck = false;
//app.time = Date.now();

let data = {artist:"", albums: []};

//Get names of artists
app.events = function(){
	$('form').on('submit', function(ev){
		ev.preventDefault();
		let artists = $('input[type=search]').val();
		artists = artists.split(',');

		let artistSearch = artists.map(artistName => app.searchArtist(artistName));
		ar = artistSearch;
		//console.log(ar[0].responseJSON.artists.items[0].id);
		for(let i = 0; i < artists.length; i++)
		{
			artists[i] = ar[i].responseJSON.artists.items[0].id;
		}
		let albumSearch = artists.map(artistName => app.searchAlbum(artistName));
		al = albumSearch;
		console.log(al);
		//var albums = [[]];
		//console.log(albums);
		let data = [];
		//console.log("data", data);
		for(let i = 0; i < artists.length; i++)
		{
			alb = [];
			nam = [];
			for(let j = 0; j < albumCount; j++)
			{
				count = 1;
				if(j == 0) 
				{
					alb[j] = al[i].responseJSON.items[j].id;
					nam[j] = al[i].responseJSON.items[j].name;
				}
				else if(j == 1)
				{
					while(nam[0] == al[i].responseJSON.items[count].name)
					{
						count++;
					}
					alb[j] = al[i].responseJSON.items[count].id;
					nam[j] = al[i].responseJSON.items[count].name;
				}
				else if(j == 2)
				{
					count = 1;
					while(nam[0] == al[i].responseJSON.items[count].name || nam[1] == al[i].responseJSON.items[count].name)
					{
						count++;
					}
					alb[j] = al[i].responseJSON.items[count].id;
					nam[j] = al[i].responseJSON.items[count].name;
				}
				//data.push({albums[j]: al[0].responseJSON.items[j].id});
			}
			data.push({artist: artists[i], albums: alb});
		}
		console.log("data", data);
		//app.noDup(data, artists.length);
		for(let i = 0; i < artists.length; i++)
		{
			//while(songCount(data[i].albums) < 15)
			{
				
			}
		}
		
//Gets Username and stores it
		let userIDTemp = app.getUserID();
		let userID = userIDTemp.responseJSON.id;
		app.userID = userID;
		localStorage.setItem("userIDSave", userID);

//Make an empty playlist
		let playlistIDTemp = app.makePlaylist().responseJSON.id;
		console.log('playlist created');
		app.playlistID = playlistIDTemp;
		console.log(app.playlistID);

//Get songs
		app.getAlbums(data, artists.length);

//Add a Songs
		//console.log(songs);
		//app.addSong(songs);
		//window.location.replace('https://people.eecs.ku.edu/~c011p976/index2.html');
		window.location.replace('https://open.spotify.com/user/' + app.userID + '/playlist/' + app.playlistID);
	});
};

app.shuffle = function(array){
	for (i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

//Search for the artists
app.searchArtist = (artistName) => $.ajax({
	url: 'https://api.spotify.com/v1/search',
	headers:{
		'Authorization': 'Bearer ' + app.accessToken
	},
	method: 'GET',
	async: false,
	dataType: 'json',
	data: {
		q: artistName,
		type: 'artist'
	}
})

app.getAlbums = function(data, size){
	for(let i = 0; i < size; i++)
	{
		//console.log(data[i].artist);
		for(let j = 0; j < data[i].albums.length; j++)
		{
			albums.push(data[i].albums[j]);
		}
	}
	console.log(albums);
	app.getSongs();
}

app.getSongs = function(){
	for(let i = 0; i < albums.length; i++)
	{
		let x = app.getAlbumTracks(albums[i]).responseJSON.items;
		console.log(x);
		for(let j = 0; j < x.length; j++)
		{
			if(x[j].duration_ms > 90000)
			{
				songs.push(x[j].uri);
			}
			//console.log(songs);
		}
	}
	app.shuffle(songs);
	while(songs.length > 0)
	{
		pushSongs = [];
		while(pushSongs.length < 100 && songs.length != 0)
		{
			console.log("before", pushSongs);
			if(songs[0] != null)
			{
				pushSongs.push(songs[0]);
			}
			songs.shift();
			console.log("after", pushSongs);
		}
		console.log(pushSongs);
		app.addSong(pushSongs);
	}
	if(pushSongs != null)
	{
		console.log(pushSongs);
		app.addSong(pushSongs);
	}
}

app.getAlbumTracks = (album) => $.ajax({
	url: 'https://api.spotify.com/v1/albums/' + album + '/tracks',
	headers:{
		'Authorization': 'Bearer ' + app.accessToken
	},
	method: 'GET',
	async: false,
	dataType: 'json',
	data: {
		limit: '50'
	}
})

app.searchAlbum = (artistName) => $.ajax({
	url: 'https://api.spotify.com/v1/artists/' + artistName + '/albums',
	headers:{
		'Authorization': 'Bearer ' + app.accessToken
	},
	method: 'GET',
	async: false
})

app.getUserID = () => $.ajax({
	url: 'https://api.spotify.com/v1/me',
	headers:{
		'Authorization': 'Bearer ' + app.accessToken
	},
	method: 'GET',
	async: false
})

//creates an empty playlist
app.makePlaylist = () => $.ajax({
	url: 'https://api.spotify.com/v1/users/' + app.userID + '/playlists',
	headers:{
		'Authorization': 'Bearer ' + app.accessToken,
		'Content-Type' : 'application/json'
	},
	method: 'POST',
	async: false,
	dataType: 'json',
	data: JSON.stringify({
		name: 'Randify Playlist',
		public: false,
		collaborative: false,
		description: 'Made using Randify',
	}),
	success: ({
		id: app.catch1,
	})
})

app.addSong = (songs) => $.ajax({
	url: 'https://api.spotify.com/v1/users/' + app.userID + '/playlists/' + app.playlistID + '/tracks',
	headers:{
		'Authorization': 'Bearer ' + app.accessToken,
		'Content-Type' : 'application/json',
		'Accept': 'application/json'
	},
	method: 'POST',
	async: false,
	dataType: 'json',
	data: JSON.stringify({
		uris: songs,
		position: '0'
	}),
})

app.auth = function(){
	window.location.replace('https://accounts.spotify.com/authorize?client_id=cf140ae1b5c249a1b406fc640522ca3c&redirect_uri=https://people.eecs.ku.edu/~c011p976/&scope=playlist-modify-private%20playlist-modify-public&response_type=token');

  url = window.location.href;
	accessToken = url.match(/\#(?:access_token)\=([\S\s]*?)\&/)[1];
	localStorage.setItem("accessTokenSave", accessToken);
	return(accessToken);
};

app.init = function(){
	if(app.accessToken == null){
		app.accessToken = app.auth();
	}
	console.log(localStorage.getItem("accessTokenSave"));
	app.events(app.accessToken);

};

$(app.init);
