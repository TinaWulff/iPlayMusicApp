import { cookies } from "next/headers";

export default async function fetchMyArtists() {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("IPM_AT");

  if (!accessTokenCookie) return null;

  const response = await fetch('/v1/playlists/{playlist_id}/tracks', {
    headers: {
      'Authorization': `Bearer ${accessTokenCookie.value}`
    }
  });

  const data = await response.json();
  console.log(data);
  return data;
}

