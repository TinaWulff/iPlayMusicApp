const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

export default function LoginPage() {
	const scope = encodeURIComponent("playlist-read-private user-read-recently-played user-top-read");
	const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&show_dialog=true&scope=${scope}`;
	
	return (
		<a href={authUrl}>To access please Log in with Spotify</a>
	);
}