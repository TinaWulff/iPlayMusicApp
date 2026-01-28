// virker ikke - deprecated, bruger new releases i stedet for!!!!
import fetchFeatured from "@/app/utilities/fetch-categories";
import fetchPlaylistsTracks from "../utilities/fetch-playlistTracks";
import { redirect } from 'next/navigation';

export default async function FeaturedPage() {
  const featured = await fetchFeatured();
  if (!featured) {
    redirect('/login');
  }

  // Hent tracks for hver featured playlist

  const featuredWithTracks = await Promise.all(
    featured.map(async (playlist) => {
      const tracks = await fetchPlaylistsTracks(playlist.id);
      return { ...playlist, tracks };
    })
  );

  console.log("featured:", featured);
  console.log("featuredWithTracks:", featuredWithTracks);

  return (
    <main>
      <section>
        <h1>Featured</h1>
        <ul>
          {featuredWithTracks.map((playlist) => (
            <li key={playlist.id} className="font-bold mb-4">
              {playlist.name}
              <ul className="ml-4 font-normal">
                {playlist.tracks && playlist.tracks.map((item) => (
                  <li key={item.track.id}>{item.track.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
