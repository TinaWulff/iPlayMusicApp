import { cookies } from "next/headers";

export default async function fetchAlbumsTracks(albumId) {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("IPM_AT");

  if (!accessTokenCookie) {
    // Hvis ingen token, redirect til login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    } else {
      // Hvis på server, kast fejl
      throw new Error("Ingen adgangstoken fundet. Redirect til login.");
    }
    return;
  }

  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
    headers: {
      'Authorization': `Bearer ${accessTokenCookie.value}`
    }
  });

  const data = await response.json();
  return data.items;
}