
import fetchNewReleases from "../utilities/fetch-newReleases";
// import fetchAlbumsTracks from "../utilities/fetch-albumtracks"; // UDKOMMENTERET - bruges ikke, spilder API kald
import { redirect } from 'next/navigation';
import Image from "next/image";
import Link from "next/link"; 
import PlayButton from "@/app/components/PlayButton";

// til afspilningsfunktionalitet - ved vores PlayButton komponent
// Mapper album til et track format som vores player forstår
function albumToTrack(album, index) {
    return {
        id: album.id,
        title: album.name,
        artist: album.artists?.[0]?.name ?? 'Unknown',
        // Bruger vores lokale musik da Spotify ikke kan afspilles uden premium
        src: `/assets/music/${['Milky_Wayvers_Love-in-Japan.mp3', 'Another Kid & Pratzapp - Kyoto (freetouse.com).mp3', 'Hazelwood - Coming Of Age (freetouse.com).mp3', 'massobeats - honey jam (freetouse.com).mp3'][index % 4]}`
    };
}

export default async function NewReleasesPage() {
  const newReleases = await fetchNewReleases();
  if (!newReleases) {
    redirect('/login');
  }

  // UDKOMMENTERET - hentede tracks for hvert album, men bruges ikke i UI'et
  // const newReleasesWithTracks = await Promise.all(
  //   newReleases.map(async (album) => {
  //     const tracks = await fetchAlbumsTracks(album.id);
  //     return { ...album, tracks };
  //   })
  // );

  return (
    <main>
      <section className="mx-4">
        <h1 className="bg-gradient-to-br from-[#EE0979] to-[#FF6A00] bg-clip-text text-transparent text-5xl font-bold mb-6">New Releases</h1>
        <ul>
          {newReleases.map((album, index) => (
            <li key={album.id} className="font-bold mb-10">
              <article className="rounded-lg w-full h-[auto] shadow-xl hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out relative">
                {album.images?.[0]?.url && (
                <Image className="rounded-lg w-full h-[auto] object-cover"
                src={album.images[0].url} alt={album.name} width={450} height={400} />
              )}
              
              <div className="absolute bottom-[30px] left-[15px] flex flex-col items-start"> 
                <PlayButton 
                    track={albumToTrack(album, index)} 
                    className="text-white hover:text-rose-400 hover:cursor-pointer drop-shadow-lg" 
                />                 
                <Link href={album.external_urls?.spotify ?? '#'} target="_blank" rel="noopener noreferrer">
                  <p className="text-white text-2xl font-bold hover:underline drop-shadow-lg">{album.name}</p>
                  <p className="text-white text-md font-light hover:underline drop-shadow-lg">
                    By {album.artists?.[0]?.name ?? ''}
                  </p>
                </Link>
              </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}