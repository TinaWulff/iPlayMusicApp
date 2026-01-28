import { cookies } from "next/headers";


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const playlistId = searchParams.get("id");
  if (!playlistId) {
    return new Response(JSON.stringify({ error: "Missing playlist id" }), { status: 400 });
  }

  const cookieStore = await cookies();
  const accessTokenCookie = cookieStore.get("IPM_AT");

  if (!accessTokenCookie) {
    return new Response(JSON.stringify({ error: "No access token" }), { status: 401 });
  }

  const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    next: { revalidate: 10*60 },
    headers: {
      'Authorization': `Bearer ${accessTokenCookie.value}`
    }
  });  

  if (!response.ok) {
    const text = await response.text();
    return new Response(JSON.stringify({ error: text }), { status: response.status });
  }

  const data = await response.json();
  return new Response(JSON.stringify({ playlists: data.items || [] }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}