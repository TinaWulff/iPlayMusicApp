
// bruges sammen med src/app/components/MyArtistsTopTracks.jsx component til at hente top tracks for hver artist
import { cookies } from "next/headers";

export default async function fetchArtistTopTracks(artistId) {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("IPM_AT");
  if (!accessTokenCookie) return [];

    const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=DK`, {
         headers: {
        'Authorization': `Bearer ${accessTokenCookie.value}`
        }
     });
    
  const data = await response.json();
  return data.tracks || [];
}

// Spotify’s “top tracks” for en artist er defineret af Spotify selv som de mest populære sange for den pågældende artist – baseret på en kombination af antal afspilninger, aktuelle trends, og popularitet i det valgte market (fx DK).

// Det er ikke nødvendigvis de mest afspillede nogensinde, men dem Spotify vurderer er mest populære lige nu i det valgte land.
// Listen kan ændre sig over tid, afhængigt af hvad der er populært blandt lyttere i det market.
// Du kan ikke selv styre, hvordan “top tracks” udvælges – det er en intern algoritme hos Spotify.

//   if (!response.ok) {
//     // Optionelt: log fejlbesked
//     console.error(`Spotify error for artist ${artistId}:`, await response.text());
//     return [];
//   }