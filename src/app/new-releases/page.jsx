
import fetchNewReleases from "../utilities/fetch-newReleases";
import fetchAlbumsTracks from "../utilities/fetch-albumtracks";
import { redirect } from 'next/navigation';

export default async function NewReleasesPage() {
  const newReleases = await fetchNewReleases();
  if (!newReleases) {
    redirect('/login');
  }

  // Hent tracks for hver new release album

  const newReleasesWithTracks = await Promise.all(
    newReleases.map(async (album) => {
      const tracks = await fetchAlbumsTracks(album.id);
      return { ...album, tracks };
    })
  );

  console.log("newReleases:", newReleases);
  console.log("newReleasesWithTracks:", newReleasesWithTracks);

  return (
    <main>
      <section>
        <h1>New Releases</h1>
        <ul>
          {newReleasesWithTracks.map((album) => (
            <li key={album.id} className="font-bold mb-4">
              {album.name}
              <ul className="ml-4 font-normal">
                {album.tracks && album.tracks.map((item) => (
                  <li key={item.id}>{item.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}