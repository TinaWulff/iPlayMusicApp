'use client';
import { useState } from "react";

export default function CCPlayListTracksToggle({ playlists } ) {
  const [activePlaylistId, setActivePlaylistId] = useState(playlists[0]?.id);
  const [playlistTracks, setPlaylistTracks] = useState({});
  const [loadingId, setLoadingId] = useState(null);

  // henter tracks for valgt playlist via din API-route
  const handleSelectPlaylist = async (id) => {
  setActivePlaylistId(id);
  if (!playlistTracks[id]) {
    setLoadingId(id);
    try {
      const res = await fetch('/playlists/playlists-tracks?id=' + id);
      const data = await res.json();
      console.log('Fetched tracks:', data);
      setPlaylistTracks((prev) => ({ ...prev, [id]: data.tracks || [] }));
    } catch (err) {
      setPlaylistTracks((prev) => ({ ...prev, [id]: [] }));
    } finally {
      setLoadingId(null);
    }
  }
};

  return (
    <>
    <ul className="flex overflow-x-auto ...">
       {playlists.map(playlist => (
         <li key={playlist.id}>
           <button onClick={() => handleSelectPlaylist(playlist.id)}>
            {playlist.name}
           </button>
         </li>
       ))}
    </ul>
    {activePlaylistId && (
    <ul className="overflow-y-auto ...">
        {playlistTracks[activePlaylistId]?.map(track => (
      <li key={track.track.id}>
         {track.name}
      </li>
      ))}
    </ul>
    )}
    </>
  );            
}

// <PlaylistItems tracks={playlist.tracks} />
// = min komponent: PlaylistItems, og de medsendte parametre =

//    <ul className="ml-4 font-normal">
//       {tracks.map((item) => (
//         <li key={item.track.id}>{item.track.name}</li>
//       ))}
//     </ul>