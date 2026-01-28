"use client";
import { useState } from "react";

const PAGE_SIZE = 50;

export default function MyArtistsPaginated({ artistsWithTopTracks }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(artistsWithTopTracks.length / PAGE_SIZE);

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

  const start = page * PAGE_SIZE;
  const end = start + PAGE_SIZE;
  const currentArtists = artistsWithTopTracks.slice(start, end);

  return (
    <div>
      <ul>
        {currentArtists.map(({ id, name, topTracks }) => (
          <li key={id} className="mb-4">
            <span className="font-bold">{name}</span>
            {topTracks && topTracks.length > 0 && (
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
      <div className="flex gap-2 mt-4">
        <button onClick={handlePrev} disabled={page === 0} className="px-2 py-1 border rounded disabled:opacity-50">Forrige</button>
        <span>Side {page + 1} af {totalPages}</span>
        <button onClick={handleNext} disabled={page === totalPages - 1} className="px-2 py-1 border rounded disabled:opacity-50">Næste</button>
      </div>
    </div>
  );
}
