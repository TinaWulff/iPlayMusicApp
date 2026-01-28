import { cookies } from "next/headers";

export default async function FetchCategories() {


  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("IPM_AT");

  if (!accessTokenCookie) return null
    // Hvis ingen token, redirect til login

  const response = await fetch('https://api.spotify.com/v1/browse/categories?limit=20', {
    headers: {
      'Authorization': `Bearer ${accessTokenCookie.value}`
    }
  });

  const data = await response.json();
 // console.log("Spotify featured playlists data:", data);
console.log("Spotify categories data:", data);
data.categories.items.forEach(cat => {
  console.log("Category:", cat.id, cat.name);
});

  if (!data.categories || !Array.isArray(data.categories.items)) {
    return [];
  }

  return data.categories.items;
}
