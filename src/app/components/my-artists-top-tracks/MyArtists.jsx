import fetchAllPlaylistArtists from "@/app/utilities/fetch-allPlaylistsArtists";
import Link from "next/link";



export default async function MyArtists() {
  const allArtists = await fetchAllPlaylistArtists(); // allArtists er i et array af { id, name }

  return (
    <ul>
      {allArtists.map(({ id, name }) => (
        <li key={id}>
          <Link href={`/artist/${id}`}>{name}</Link>
        </li>
        ))}
    </ul>
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