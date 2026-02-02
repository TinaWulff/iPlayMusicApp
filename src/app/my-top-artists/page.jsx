import fetchMyTopArtists from "@/app/utilities/fetch-myTopArtists";
import fetchArtistTopTracks from "../utilities/fetch-myArtistsTopTracks";
import MyTopArtistToggle from "./MyTopArtistToggle";
import { redirect } from 'next/navigation';

export default async function MyTopArtistsPage() {
    const topArtists = await fetchMyTopArtists();
    if (!topArtists || !Array.isArray(topArtists) || topArtists.length === 0) {
      redirect('/login');
    }


    return (
      <section className="max-w-full w-full mx-4">
        <h1 className="text-3xl font-bold mb-6 mt-2 text-red-400">
            My Top Artists</h1>
        <MyTopArtistToggle artists={topArtists} />
      </section>
    );
};

//try {
// ...kode plus til slut:
//   } catch (err) {
//     console.error('Fejl i MyTopArtistsPage:', err);
//     return <section><h1>My Top Artists</h1><p>Serverfejl: {err.message}</p></section>;
//   }

// Med catch:
// Du kan vise en mere brugervenlig fejlbesked og logge fejlen, så du lettere kan debugge.

// Fordelene ved at beholde catch:

// Du får en pænere fejlbesked til brugeren.
// Du kan logge fejlen til konsollen for debugging.
// Du undgår at hele siden crasher med en grim fejl.
// Kort sagt:
// Du kan godt fjerne den, men det anbefales at beholde den for bedre fejl-håndtering!