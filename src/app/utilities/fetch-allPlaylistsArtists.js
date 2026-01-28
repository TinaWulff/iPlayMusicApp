import fetchPlaylists from "./fetch-playlists"; //Hent alle playlister med din fetchPlaylists-funktion.
import fetchPlaylistTracks from "./fetch-playlistTracks"; //For hver playliste, hent tracks med din fetchPlaylistTracks-funktion.


//For hvert track, saml alle artists (track.track.artists)
//Gem alle artists i et array og fjern dubletter (fx med et Set-for at undgå dubletter)
export default async function fetchAllPlaylistArtists() {
  const playlists = await fetchPlaylists();
  if (!playlists || !playlists.items) return [];

  const allArtists = new Set(); //fjerner dubletter

  for (const playlist of playlists.items) {
    const tracks = await fetchPlaylistTracks(playlist.id);
    if (tracks && Array.isArray(tracks)) {
      tracks.forEach(item => {
        if (item.track && item.track.artists) {
          item.track.artists.forEach(artist => {
            allArtists.add(JSON.stringify({ id: artist.id, name: artist.name })); //Gem både id og navn, så jeg kan vise listen eller bruge id’et til opslag.
          });
        }
      });
    }
  }

  // Konverter Set til array af artist-objekter
  return Array.from(allArtists).map(str => JSON.parse(str));
}