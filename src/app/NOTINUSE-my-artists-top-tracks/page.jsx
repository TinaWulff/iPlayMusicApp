// Denne side bruges ikke i appen. har været brugt til udvikling, men er lavet om og optimeret til My-top-artist. 
// enne metode fetcher for meget på en gang og presser rate limit.

import fetchAllPlaylistArtists from "@/app/utilities/fetch-allPlaylistsArtists";
import fetchArtistTopTracks from "@/app/utilities/fetch-myArtistsTopTracks";
import MyArtistsWithToggles from "@/app/components/my-artists-top-tracks/MyArtistsWithToggles.jsx";
import fetchMyTopArtists from "../utilities/fetch-myTopArtists";

export default async function MyArtistsTopTracksPage() {
  // Hent alle artists fra playlister
  const allArtists = await fetchAllPlaylistArtists();
  // Hent brugerens top artists
  const topArtists = await fetchMyTopArtists();

  // Lav et map for hurtig lookup af top artist id'er
  const topArtistIds = new Set(topArtists ? topArtists.map(a => a.id) : []);

  // Flet og sorter: top artists først, resten bagefter uden dubletter
  const sortedArtists = [
    ...(topArtists ? topArtists.map(a => ({ id: a.id, name: a.name })) : []),
    ...allArtists.filter(a => !topArtistIds.has(a.id))
  ];

  // Hent top tracks for alle artists parallelt
  const artistsWithTopTracks = await Promise.all(
    sortedArtists.map(async (artist) => ({
      ...artist,
      topTracks: await fetchArtistTopTracks(artist.id),
    }))
  );

  return (
    <section>
      <h1>Mine kunstnere & deres top tracks</h1>
      <MyArtistsWithToggles artistsWithTopTracks={artistsWithTopTracks} />
    </section>
  );
}


// forskel på map og forEach:
// map = til at bygge og returnere en ny array (fx til rendering)
// forEach = til at udføre en handling for hvert element, uden at returnere ny array


// læs op på:

// async functioner vs defaluts
// set som bruges i src/app/utilities/fetch-allPlaylistsArtists.js fx er der her:       
// Ja, du kan godt lave et fetch for hver artist inde i dit map,
// men fordi din komponent er async og fetchAllPlaylistArtists allerede er async,
// skal du hente top tracks for alle artists før du returnerer din JSX.
// Du kan ikke lave et fetch direkte inde i map-funktionen i render-return,
// fordi det ikke er tilladt at bruge async/await direkte i JSX.
// I stedet skal du hente alle top tracks for alle artists først, og så mappe over det samlede resultat.

// Om await og Promise.all:
// Når du har en liste af asynkrone operationer (som fetch-kald),
// kan du bruge Promise.all til at vente på, at alle operationer er fuldført,
// før du fortsætter. Dette er nyttigt, når du skal hente data for flere items,
// som i dit tilfælde med at hente top tracks for hver artist.
// Ved at bruge Promise.all sammen med map,
// kan du sikre, at du har alle de nødvendige data,
// før du render din komponent.