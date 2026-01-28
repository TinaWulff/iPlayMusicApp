'use client';
import { useState } from "react";
import Image from "next/image";

export default function MyTopArtistToggle({ artists }) {
  const [openArtistId, setOpenArtistId] = useState(null);
  const [artistTracks, setArtistTracks] = useState({}); // { [artistId]: [tracks] }
  const [loadingId, setLoadingId] = useState(null); // For at vise loading pr. artist

const toggleArtist = async (id) => {
  if (openArtistId === id) {
    setOpenArtistId(null);
  } else {
    setOpenArtistId(id);
    if (!artistTracks[id]) {
      setLoadingId(id);
      try {
        const res = await fetch('/my-top-artists/artist-top-tracks?id=' + id);
        const data = await res.json();
        setArtistTracks((prev) => ({ ...prev, [id]: data.tracks || [] }));
      } catch (err) {
        setArtistTracks((prev) => ({ ...prev, [id]: [] }));
      } finally {
        setLoadingId(null);
      }
    }
  }
};

  return (
    <section className="">
      <ul className="flex gap-4 w-full max-w-full overflow-x-auto flex-nowrap">
        {artists.map(({ id, name, images }) => (
          <li key={id} className="flex-row">
            <button className="font-bold text-gray-700 text-xs text-center w-30 h-30"
              onClick={() => toggleArtist(id)}
              type="button"
            >
              {images && images.length > 0 && (
                <Image
                  src={images[0].url}
                  alt={name}
                  width={70}
                  height={70}
                  className="w-full h-full rounded-xl mb-1 object-cover shadow-lg"
                />
              )}
              {name}
            </button>
          </li>
        ))}
      </ul>

      {openArtistId && (
        <article className="w-full mt-4">
            <h2 className="text-xl mb-4 font-bold">
                {artists.find(artist => artist.id === openArtistId)?.name}</h2>

          {loadingId === openArtistId ? (
            <div>Henter top tracks...</div>
          ) : (
            <ul className="font-normal w-full overflow-y-auto max-h-96">
              {(artistTracks[openArtistId] || []).map((track) => (
                <li className=" gap-4 mb-2"
                key={track.id}>
                  <a className="flex gap-4"
                  href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                    
                    {track.album?.images?.[0]?.url && (
                      <Image
                        src={track.album.images[0].url}
                        alt={track.name}
                        width={70}
                        height={70}
                        className="rounded-lg mb-1 object-cover shadow-lg"
                      />
                    )}
                    <div className="align-center">
                    <p className="font-bold">
                        {track.name}
                    </p>
                    <p className="text-xs m-auto">From album: 
                        <span className="italic"> {track.album?.name}</span>
                    </p>
                    </div>
                    
                  </a>
                </li>
              ))}
              {artistTracks[openArtistId] && artistTracks[openArtistId].length === 0 && (
                <li>Ingen top tracks fundet.</li>
              )}
            </ul>
          )}
        </article>
      )}
    </section>
  );
}