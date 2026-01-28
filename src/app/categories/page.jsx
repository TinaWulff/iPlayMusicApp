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

  return (
    <main>
    <section>
    <h1>Playlists</h1>

    <h2>My Playlists</h2>

    <ul>
        {categoriesWithPlaylists.map((category) => (
       <li key={category.id} className="font-bold mb-4">
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
    </main>
  );

}

// her får jeg så en liste med categories..