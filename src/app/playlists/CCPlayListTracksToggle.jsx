'use client';
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import PlayButton from "@/app/components/PlayButton";

// til afspilningsfunktionalitet - ved vores PlayButton komponent
// Mapper track til format som vores player forstår
function trackToPlayerTrack(track, idx) {
    return {
        id: track.track?.id ?? idx,
        title: track.track?.name ?? 'Ukendt track',
        artist: track.track?.artists?.[0]?.name ?? 'Unknown',
        // Bruger lokale sange da Spotify ikke kan streames uden premium
        src: `/assets/music/${['Milky_Wayvers_Love-in-Japan.mp3', 'Another Kid & Pratzapp - Kyoto (freetouse.com).mp3', 'Hazelwood - Coming Of Age (freetouse.com).mp3', 'massobeats - honey jam (freetouse.com).mp3'][idx % 4]}`
    };
}

export default function CCPlayListTracksToggle({ playlists } ) {
  const [activePlaylistId, setActivePlaylistId] = useState(playlists[0]?.id);
  const [playlistTracks, setPlaylistTracks] = useState({});
  const [loadingId, setLoadingId] = useState(null);
  const carouselRef = useRef(null);

  // Hent tracks for første playliste ved load
  useEffect(() => {
    if (playlists[0]?.id && !playlistTracks[playlists[0].id]) {
      fetchTracksForPlaylist(playlists[0].id);
    }
  }, []);

  // Henter tracks for valgt playlist via din API-route
  const fetchTracksForPlaylist = async (id) => {
    if (!playlistTracks[id]) {
      setLoadingId(id);
      try {
        const res = await fetch('/playlists/playlists-tracks?id=' + id);
        const data = await res.json();
        setPlaylistTracks((prev) => ({ ...prev, [id]: data.tracks || [] }));
      } catch (err) {
        setPlaylistTracks((prev) => ({ ...prev, [id]: [] }));
      } finally {
        setLoadingId(null);
      }
    }
  };
//LÆS OP PÅ DET HER CAROUSEL SCROLL OG LAV DEN BEDRE!
  // Håndterer klik på en playliste
  const handleSelectPlaylist = async (id) => {
    setActivePlaylistId(id);
    await fetchTracksForPlaylist(id);
    
    // Scroll til den valgte playliste i carouselen
    const element = document.getElementById(`playlist-${id}`);
    if (element && carouselRef.current) {
      const container = carouselRef.current;
      const scrollLeft = element.offsetLeft - container.offsetWidth / 2 + element.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <>
    <section className="relative">
      {/* Carousel med playlister */}
      <ul 
        ref={carouselRef}
        className="flex overflow-x-auto gap-4 py-4 px-8 snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {playlists.map(playlist => (
          <li 
            key={playlist.id} 
            id={`playlist-${playlist.id}`}
            className="snap-center flex-shrink-0"
          >
            <button 
              className={`w-[120px] transition-all duration-300 ${
                activePlaylistId === playlist.id 
                  ? 'scale-110 opacity-100' 
                  : 'scale-90 opacity-60 hover:opacity-80'
              }`} 
              onClick={() => handleSelectPlaylist(playlist.id)}
            >
              {playlist.images?.[0]?.url && (
                <Image
                  src={playlist.images[0].url}
                  alt={playlist.name}
                  width={120}
                  height={120}
                  className={`rounded-lg w-full ${
                    activePlaylistId === playlist.id ? 'scale-105' : ''
                  }`}
                />
              )}
              <p className={`text-sm mt-2 truncate ${
                activePlaylistId === playlist.id ? 'font-bold text-xl' : ''
              }`}>
                {playlist.name}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </section>

    <section className="w-full">
        {/* <h3>activePlaylistId === {playlist.name}</h3> */}
    {activePlaylistId && (
    <ul className="overflow-y-auto h-[500px] mb-10 mx-4">
        {playlistTracks[activePlaylistId]
          ?.filter(track => track.track)
          .map((track, idx) => (

      <li key={track.track?.id ?? idx} className="flex gap-4 align-items-center mb-4"
      >
         <PlayButton 
            track={trackToPlayerTrack(track, idx)} 
            className="text-rose-500 hover:cursor-pointer drop-shadow-lg" 
         />  
        <Link href={`/tracks/${track.track?.id ?? '#'}`}><p className="text-md font-bold col-2 self-center row-span-2 group-hover:text-white">{track.track?.name ?? 'Ukendt track'}
            <br /><span className="col-start-2 font-light text-xs">{track.track?.artists?.[0]?.name ?? ''}</span>
            </p> </Link>
            {/* <IoPlayCircleSharp
              size={50}
              className="text-rose-500 "
              style={{ left: 0, right: 0, top: 0, bottom: 0 }}
            /> */}               
      </li>
      ))}
    </ul>
    
    )}
    </section>
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