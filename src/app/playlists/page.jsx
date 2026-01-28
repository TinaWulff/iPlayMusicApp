import CCPlayListTracksToggle from "./CCPlayListTracksToggle";
import fetchPlaylists from "@/app/utilities/fetch-playlists";
import { redirect } from 'next/navigation';


export default async function PlaylistsPage() {
 const playlists = await fetchPlaylists();
  if (!playlists) {
    redirect('/login');
  }

  return (
      <section>
         <h1 className="text-3xl font-bold mb-6 mt-2 text-rose-500">
          My Playlists</h1>
        <CCPlayListTracksToggle playlists={playlists} />
      </section>
    
  );

}

// <PlaylistItems tracks={playlist.tracks} />
// = min komponent: PlaylistItems, og de medsendte parametre =

//    <ul className="ml-4 font-normal">
//       {tracks.map((item) => (
//         <li key={item.track.id}>{item.track.name}</li>
//       ))}
//     </ul>