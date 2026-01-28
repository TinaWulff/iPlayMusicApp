"use client";
import { useState } from "react";

export default function MyArtistsWithToggles({ artistsWithTopTracks }) {
  const [openArtistIds, setOpenArtistIds] = useState([]);

  const toggleArtist = (id) => {
    setOpenArtistIds((prev) =>
      prev.includes(id) ? prev.filter((aid) => aid !== id) : [...prev, id]
    );
  };

  return (
    <ul>
      {artistsWithTopTracks.map(({ id, name, topTracks }) => (
        <li key={id} className="mb-4">
          <button
            className="font-bold underline text-left"
            onClick={() => toggleArtist(id)}
            type="button"
          >
            {name}
          </button>
          {openArtistIds.includes(id) && (
            <ul className="ml-4 font-normal">
              {topTracks.map((track) => (
                <li key={track.id}>
                  <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                    {track.name}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
