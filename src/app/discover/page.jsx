import fetchCategoryPlaylists from '../utilities/fetch-categoryPlaylists';
import FetchCategories from '../utilities/fetch-categories';  


import fetchNewReleases from "../utilities/fetch-newReleases";
import fetchAlbumsTracks from "../utilities/fetch-albumtracks";
import { redirect } from 'next/navigation';
import Image from "next/image";
import Link from "next/link"; 

export default async function DiscoverPage() {
    //hent new releases fetch og visning
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

  //console.log("newReleases:", newReleases);
  //console.log("newReleasesWithTracks:", newReleasesWithTracks);

    //hent categories fetch og visning
    const categories = await FetchCategories();
    const categoriesWithPlaylists = await Promise.all(
      //Følgende del forsøger at hente playlists for hver kategori, men virker ikke, pga endpointet er deprecated
        categories.map(async (category) => {
      const playlists = await fetchCategoryPlaylists(category.id);
          return { ...category, playlists };
      })
    );

  return (
<section className='w-full max-w-full'>
    <h1 className='bg-gradient-to-br from-[#EE0979] to-[#FF6A00] bg-clip-text text-transparent text-5xl font-bold my-6'>Discover</h1>

    {/* Categories section */}
    <section className='mb-6'>
        <h2 className='mb-6 text-2xl font-bold'>Categories</h2>
        <ul className='flex gap-4'>
            {categoriesWithPlaylists.map((category) => (
            <li key={category.id} className="font-bold mb-4">
                <article className="hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out w-[100px]">
                        {category.icons?.[0]?.url && (
                    <Image className="rounded-full object-cover mb-2 shadow-xl"
                        src={category.icons[0].url} alt={category.name} width={100} height={100} />
                    )}
                     <p className="flex items-center text-center justify-center font-bold hover:underline text-xs">
                            {category.name}
                        </p>

                {/* Playlists (may be empty due to deprecated endpoint) */}
              <ul className="ml-4 font-normal">
                {category.playlists && category.playlists.map((playlist) => (
                  <li key={playlist.id}>
                    {playlist.name}
                </li>
                ))}
              </ul>
                </article>
            </li>
            ))}
        </ul>
    </section>

    {/* New Releases section */}
    <section className='w-full max-w-full'>
        <h2 className="text-2xl font-bold mb-6">
            New Releases</h2>
        <ul className='flex gap-10 overflow-x-auto'>
          {newReleasesWithTracks.map((album) => (
            <li key={album.id} className="font-bold mb-10 flex-shrink-0">
              <article className="hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out w-[100px]">
              <Link href={album.external_urls?.spotify ?? '#'} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center">
              {album.images?.[0]?.url && (
                <Image className="rounded-full object-cover mb-2 shadow-xl"
                src={album.images[0].url} alt={album.name} width={100} height={100} />
              )}
              
              <div className="font-normal w-full flex flex-col items-center justify-center text-center">                  
                <p className="text-xs font-bold line-clamp-2">{album.name}</p>
                <p className="text-xs font-light hover:underline">
                  {album.artists?.[0]?.name ?? ''}
                </p>
              </div>
              
              </Link>
              </article>
            </li>
          ))}
        </ul>
    </section>

    {/* My top artists section */}
    <section>
          

    </section>

</section>

  );
}