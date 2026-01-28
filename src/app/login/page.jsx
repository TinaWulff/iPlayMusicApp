const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

export default function LoginPage() {
	return (
		<a href={`https://accounts.spotify.com/authorize?
			response_type=code
			&client_id=${CLIENT_ID}
			&redirect_uri=${REDIRECT_URI}
			&show_dialog=true
			&scope=playlist-read-private 
			user-read-recently-played user-top-read`}>To access please Log in with Spotify</a>
	);
}

// {`https://accounts.spotify.com/authorize?
// 			response_type=code
// 			&client_id=${CLIENT_ID}
// 			&redirect_uri=${REDIRECT_URI}
// 			&show_dialog=true
// 			&scope=playlist-read-private`}