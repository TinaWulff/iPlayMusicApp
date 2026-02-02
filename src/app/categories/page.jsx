import { redirect } from 'next/navigation';

import PlaylistItems from "@/app/components/PlaylistItems";
import fetchCategoryPlaylists from '../utilities/fetch-categoryPlaylists';
import FetchCategories from '../utilities/fetch-categories';  


export default async function CategoriesPage() {

 const categories = await FetchCategories();
  if (!categories) {
    redirect('/login');
  }

    const categoriesWithPlaylists = await Promise.all(
    categories.map(async (category) => {
    const playlists = await fetchCategoryPlaylists(category.id);
        return { ...category, playlists };
    })
  );

  // Regnbuefarver array
  const regnbueFarver = [
    'from-[#D70060] to-[#E54028]', // rød
    'from-[#E54028] to-[#F18D05]', // orange
    'from-[#F18D05] to-[#F2BC06]', // gul
    'from-[#F2BC06] to-[#B8B80F]', // gul lys
    'from-[#B8B80F] to-[#89B416]', // grøn lys
    'from-[#89B416] to-[#3CB371]', // grøn
    'from-[#3CB371] to-[#0ABEBE]', // turkis
    'from-[#0ABEBE] to-[#00A1CB]', // blågrøn
    'from-[#00A1CB] to-[#115793]', // blå
    'from-[#115793] to-[#3B349F]', // indigo
    'from-[#3B349F] to-[#6A0DAD]', // lilla
    'from-[#6A0DAD] to-[#AD48C5]', // violet
    'from-[#AD48C5] to-[#DA70D6]', // violet lys
    'from-[#DA70D6] to-[#D82E91]', // violet-pink
    'from-[#D82E91] to-[#D70060]', // pink-pinkrød
  ];

  return (

    <section className='w-full max-w-full mx-4 mb-0'>
    <h1 className='text-4xl font-bold mb-6 bg-gradient-to-br from-[#EE0979] to-[#FF6A00] bg-clip-text text-transparent'>Categories</h1>

    <ul className='h-[800px] overflow-y-auto w-full max-w-full gap-4 pb-10'>
        {categoriesWithPlaylists.map((category, idx) => (
       <li key={category.id} className={`font-bold text-white mb-4 p-4 w-full bg-gradient-to-br ${regnbueFarver[idx % regnbueFarver.length]} rounded-lg shadow-lg`}>
              {category.name}
              <ul className="ml-4 font-normal">
                {category.playlists && category.playlists.map((playlist) => (
                  <li key={playlist.id}>{playlist.name}</li>
                ))}
              </ul>
            </li>
  ))}
    </ul>
    </section>
  );

}

// her får jeg så en liste med categories..