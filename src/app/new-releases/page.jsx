
import fetchNewReleases from "../utilities/fetch-newReleases";
import fetchAlbumsTracks from "../utilities/fetch-albumtracks";
import { redirect } from 'next/navigation';
import Image from "next/image";
import Link from "next/link"; 

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
        <h1 className="bg-gradient-to-br from-[#EE0979] to-[#FF6A00] bg-clip-text text-transparent text-5xl font-bold mb-6">New Releases</h1>
        <ul>
          {newReleasesWithTracks.map((album) => (
            <li key={album.id} className="font-bold mb-10">
              <article className="rounded-lg w-full h-[350px] shadow-xl hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out ">
              <Link href={album.external_urls?.spotify ?? '#'} target="_blank" rel="noopener noreferrer">
              {album.images?.[0]?.url && (
                <Image className="rounded-lg w-full h-[350px] object-cover mb-2"
                src={album.images[0].url} alt={album.name} width={300} height={350} />
              )}
              
              
              <ul className=" ml-4 font-normal">
                {album.tracks && album.tracks.map((item) => (
                  <li key={item.id}>
                    <div className="relative bottom-[100px] align-items center">                  
                      <p className="text-white text-2xl font-bold">{album.name}</p>
                      <p className="">
                        <Link href={item.artists?.[0]?.external_urls?.spotify ?? '#'} target="_blank" rel="noopener noreferrer"
                        className="text-white text-md font-light hover:underline">
                       {item.artists?.[0]?.name ? `By ${item.artists[0].name}` : ''}
                        </Link>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              
              </Link>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}