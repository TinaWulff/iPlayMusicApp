import fetchArtistTopTracks from "@/app/utilities/fetch-myArtistsTopTracks";
import Link from "next/link";

export default async function ArtistTopTracks({ artistId }) {
  const tracks = await fetchArtistTopTracks(artistId);

  return (
    <section>
        <h2>Top Tracks</h2>
        <ul className="ml-4 font-normal">
              {tracks.map((track) => (
                <li key={track.id}>
                  <Link href={track.external_urls.spotify} target="_blank">{track.name}</Link>
                </li>
              ))}
        </ul>
    </section>
      );
}