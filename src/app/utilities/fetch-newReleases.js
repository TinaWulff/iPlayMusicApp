
import next from "next";
import { cookies } from "next/headers";

export default async function fetchNewReleases() {
  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("IPM_AT");

  if (!accessTokenCookie) {
    // Hvis ingen token, redirect til login
      if (!accessTokenCookie) return null
  }

  const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
    next: { revalidate: 60*60*24 },
    headers: {
      'Authorization': `Bearer ${accessTokenCookie.value}`
    }
  });

  const data = await response.json();
  console.log("New releases data:", data);
  return data.albums ? data.albums.items : [];
}