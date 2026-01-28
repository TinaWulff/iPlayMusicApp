import { cookies } from "next/headers";

export default async function fetchPlaylists() {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("IPM_AT");

  if (!accessTokenCookie) return null;

  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
    next: { revalidate: 9000 },
    headers: {
      'Authorization': `Bearer ${accessTokenCookie.value}`
    }
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('Spotify playlists fetch error:', text);
    return [];
  }

  const data = await response.json();
  if (data && Array.isArray(data.items)) {
    return data.items;
  } else {
    console.error('Spotify playlists fetch error:', data);
    return [];
  }
}
