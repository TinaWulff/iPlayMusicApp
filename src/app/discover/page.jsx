// import fetchCategoryPlaylists from '../utilities/fetch-categoryPlaylists'; // FJERNET - endpoint virker ikke
import FetchCategories from '../utilities/fetch-categories';  
import fetchMyTopArtists from "../utilities/fetch-myTopArtists";
import MyTopArtistToggle from "../my-top-artists/MyTopArtistToggle.jsx";

import fetchNewReleases from "../utilities/fetch-newReleases";
// import fetchAlbumsTracks from "../utilities/fetch-albumtracks";
import { redirect } from 'next/navigation';
import Image from "next/image";
import Link from "next/link"; 

export default async function DiscoverPage() {
    //hent new releases fetch og visning
    const newReleases = await fetchNewReleases();
         if (!newReleases) {
        redirect('/login');
      }
    // FJERNET - hentede tracks for hvert album, men de bruges ikke i UI'et
    // Sparer ~20 API kald!
    // const newReleasesWithTracks = await Promise.all(
    //   newReleases.map(async (album) => {
    //     const tracks = await fetchAlbumsTracks(album.id);
    //     return { ...album, tracks };
    //   })
    // );

  //console.log("newReleases:", newReleases);
  //console.log("newReleasesWithTracks:", newReleasesWithTracks);

    //hent categories fetch og visning
    const categories = await FetchCategories();
    // FJERNET - category playlists endpoint virker ikke og spilder rate limit
    // const categoriesWithPlaylists = await Promise.all(
    //   categories.map(async (category) => {
    //     const playlists = await fetchCategoryPlaylists(category.id);
    //     return { ...category, playlists };
    //   })
    // );

    // hent top artists (bruges af MyTopArtistToggle som henter tracks on-demand)
      const topArtists = await fetchMyTopArtists();


  return (
<section className='w-full max-w-full'>
    
    <h1 className='mx-4 bg-gradient-to-br from-[#EE0979] to-[#FF6A00] bg-clip-text text-transparent text-5xl font-bold mt-4 mb-6'>
        Discover</h1>  
    
    {/* Categories section */}
    <section className='mb-10 w-full max-w-full h-auto'>
    <div className='flex justify-between mx-4 align-center mb-2'>
        <h2 className='mb-2 text-xl font-bold pl-4'>Categories</h2>
        <Link href="/categories" className='flex justify-self-end align-center items-center h-[24px] px-4 border-2 text-rose-400 border-rose-400 rounded-xl text-xs hover:bg-rose-400 hover:text-white'>
            View all</Link> 
    </div>

        <ul className='flex gap-4 overflow-x-auto p-4'>
            {categories.map((category) => (
            <li key={category.id} className="font-bold">
                <article className="hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out w-[100px]">
                        {category.icons?.[0]?.url && (
                    <Image className="rounded-full object-cover mb-2 shadow-xl"
                        src={category.icons[0].url} alt={category.name} width={100} height={100} />
                    )}
                     <p className="flex items-center text-center justify-center font-bold hover:underline text-xs">
                            {category.name}
                        </p>
                </article>
            </li>
            ))}

            {/* UDKOMMENTERET - Brug denne JSX når du finder et endpoint der virker:
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
                    <ul className="ml-4 font-normal">
                        {category.playlists && category.playlists.map((playlist) => (
                            <li key={playlist.id}>{playlist.name}</li>
                        ))}
                    </ul>
                </article>
            </li>
            ))}
            */}
        </ul>
    </section>

    {/* New Releases section */}
    <section className='w-full max-w-full h-auto'>
        <div className='flex justify-between mx-4 align-center mb-2'>
        <h2 className="text-xl font-bold mb-2">
            New Releases</h2>
            <Link href="/new-releases" className='flex justify-self-end align-center items-center h-[24px] px-4 border-2 text-rose-400 border-rose-400 rounded-xl text-xs hover:bg-rose-400 hover:text-white'>
            View all</Link>
        </div>
        <ul className='flex gap-2 overflow-x-auto'>
          {newReleases.map((album) => (
            <li key={album.id} className="font-bold mb-10 flex-shrink-0">
              <article className="hover:cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out w-full h-[auto] p-4">
              <Link href={album.external_urls?.spotify ?? '#'} target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center">
              {album.images?.[0]?.url && (
                <Image className="rounded object-cover object-center mb-2 shadow-xl w-full h-[200px]"
                src={album.images[0].url} alt={album.name} width={400} height={200} />
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
    <section className='mx-4 height-[500px]] mb-10 overflow-y-auto'>
        <div className='flex justify-between align-center mb-2'>
            <h2 className='text-xl font-bold mb-6 pt-2 leading-3'>
            My Top Artists <br /><span className='text-lg'>& Top Tracks</span></h2>
            
            <Link href="/my-top-artists" className='flex justify-self-end align-center items-center h-[24px] px-4 border-2 text-rose-400 border-rose-400 rounded-xl text-xs hover:bg-rose-400 hover:text-white'>
            View all</Link> 
        </div>
    <MyTopArtistToggle artists={topArtists} 
    />
       
    </section>

</section>

  );
}

// MyTopArtistToggle ← DEN DU BRUGER NU
// Modtager kun topArtists (artist info, INGEN tracks)
// Henter tracks on-demand når bruger klikker (client-side fetch)

// <MyArtistsWithToggles artistsWithTopTracks={artistsWithTopTracks} /> //