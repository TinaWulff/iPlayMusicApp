import { cookies } from "next/headers";


export default async function fetchMyTopArtists() {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("IPM_AT");

  if (!accessTokenCookie) return null;

  const response = await fetch('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', {
    next: { revalidate: 9000 },
    headers: {
      'Authorization': `Bearer ${accessTokenCookie.value}`
    }
  });

  const data = await response.json();
  console.log(data.items);
  return data.items;
}